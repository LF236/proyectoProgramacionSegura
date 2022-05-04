const db = require( '../database/models' );
const bcryptjs = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const { buscarEmail } = require('../helpers/consultasUsuarios');
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

    test: ( req, res ) => {
        // console.log( req );
        res.send( 'This is just a test' );
    }
};

module.exports = apiControllers;