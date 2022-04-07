const db = require( '../database/models' );
const buscarEmail = ( cadena ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const emailInDb = await db.Usuario.findAll({ where: { correo: cadena }, raw: true } );
            resolve( emailInDb );
        }
        catch( err ) {
            resolve( false );
        }
    })
}

module.exports = {
    buscarEmail
}