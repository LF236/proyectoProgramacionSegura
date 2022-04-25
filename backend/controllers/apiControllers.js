const db = require( '../database/models' );
const bcryptjs = require( 'bcryptjs' );
const { buscarEmail } = require('../helpers/consultasUsuarios');
const apiControllers = {
    home: ( req, res ) => {
        res.send( 'This is de API' );
    },

    processLogin: async ( req, res ) => {
        const { email, password } = req.body;
        // Buscar si el email esta registrado en la DB
        buscarEmail( email )
            .then(emailInDb => {
                if( emailInDb.length == 0 ) {
                    return res.send( 'Not found' );
                }
                // Verificamos si el password recibido es igual al registrado en la DB                
                emailInDb = emailInDb[ 0 ];
                // Se compara el password recibido con el password hasheado en la DB
                if( bcryptjs.compareSync(  password , emailInDb.password ) ) {
                    return res.send( 'YES' );
                }
                else {
                    return res.send( 'Not found' );
                }                
            })
    }
};

module.exports = apiControllers;