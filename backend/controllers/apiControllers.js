const db = require( '../database/models' );
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
                if( emailInDb.password == password ) {
                    return res.send( 'YES' );
                }
                else {
                    return res.send( 'Not found' );
                }
                
            })
        // console.log( emailInDb );
        // console.log( password );
        // res.send('HOLI WAWPO');
    }
};

module.exports = apiControllers;