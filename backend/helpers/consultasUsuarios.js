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

const buscarUsuario = ( id ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const user = await db.Usuario.findByPk( id, {
                raw: true,
                attributes: [ 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'matricula' ]
            } );
            resolve( user );
        }
        catch {
            reject( false );
        }
    });
}

module.exports = {
    buscarEmail,
    buscarUsuario
}