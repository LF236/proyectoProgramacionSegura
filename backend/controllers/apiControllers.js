const db = require( '../database/models' );
const bcryptjs = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const { buscarEmail, buscarUsuario, buscarMatricula } = require('../helpers/consultasUsuarios');
const { sendVerificationCode, generateVerificationCode } = require('../helpers/apiCorreo');
const apiControllers = {
    home: ( req, res ) => {
        res.send( 'This is de API' );
    },

    processLogin: async ( req, res ) => {
        const { email, password } = req.body;
        console.log( password );
        // Buscar si el email esta registrado en la DB
        buscarEmail( email )
            .then(emailInDb => {
                if( emailInDb.length == 0 ) {
                    return res.send( {
                        auth: false
                    } );
                }
                // Verificamos si el password recibido es igual al registrado en la DB                
                emailInDb = emailInDb[ 0 ];  
                // Se compara el password recibido con el password hasheado en la DB
                if( bcryptjs.compareSync(  password , emailInDb.password ) ) {
                    const jwtToken = jwt.sign(
                        {
                            id: emailInDb.id,
                            email: emailInDb.correo
                        },
                        'jswSecretFirma',
                        {
                           expiresIn: 300 
                        }
                    );
                    return res.send( {
                        auth: true,
                        jwtToken,
                    } );
                }
                else {
                    return res.send( {
                        auth: false
                    } );
                }                
            })
    },

    registrarUsuario: async ( req, res ) => {
        const dataUsuarioNuevo = req.body;
        // Verificamos que el correo del usuario no se encuentre registrado 
        const emailInDb =  await buscarEmail( dataUsuarioNuevo.correo );
        // Si el correo se encuentra dentro de la db mandar mensaje de error
        if( emailInDb  ) {
            return res.status( 403 ).send( { error: 'El correo ya se encuentra registrado' } );
        }
        // Si la matricula se encuentra registrada dentro de la DB mandar mensaje de error
        const matriculaInDb = await buscarMatricula( dataUsuarioNuevo.matricula );
        if( matriculaInDb ) {
            return res.status( 403 ).send( { error: 'La matricula ya se encuentra registrada' } );
        }
        // Enviamos un correo con el código de confirmación que debe ser introducido para poder terminar el proceso de verificación
        const codigoVerificacion = generateVerificationCode();
        const sendCode = await sendVerificationCode( dataUsuarioNuevo.correo, `${ dataUsuarioNuevo.nombre } ${ dataUsuarioNuevo.apellidoPaterno }`, codigoVerificacion );
        // Si al mandar un correo sale mal ( correo falso ) mandar mensaje de error
        if( !sendCode ) {
            return res.status( 403 ).send( { error: 'Error al enviar el código de verificación, verifica si tienes acceso' } );
        }
        // ----> SI TODO SALE BIEN
        // Agregamos el codigo de verificacion a la data del usuario 
        dataUsuarioNuevo[ 'codigoVerificacion' ] = codigoVerificacion;
        // Creamos un nuevo token almacenando la data del usuario de manera temporal
        const temporalDataNewUser = jwt.sign(
            dataUsuarioNuevo,
            'jswSecretFirma',{
                expiresIn: 300
            }
        );
        res.status( 200 ).send( { temporalDataNewUser: temporalDataNewUser } );
    },

    userInfo: async ( req, res ) => {
        const idUsuario = req.userId;
        // Obtenemos la información del usuario actual a través de una Query a la DB
        // ->NO enviar enformación sensible
        const currentUser = await buscarUsuario( idUsuario );
        res.send({
            auth: true,
            currentUser
        });
    },

    test: ( req, res ) => {
        // console.log( req );
        res.send( 'This is just a test' );
    }
};

module.exports = apiControllers;