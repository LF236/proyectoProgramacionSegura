const db = require( '../database/models' );
const buscarEmail = ( cadena ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const emailInDb = await db.Usuario.findAll({ 
                where: { correo: cadena }, 
                raw: true ,
                attributes: [ 'correo', 'password', 'id' ],
            } );
            
            resolve( emailInDb );
        }
        catch( err ) {
            reject( false );
        }
    })
}

const buscarMatricula = ( matricula )=> {
    return new Promise( async ( resolve, reject ) => {
        try {
            const matriculaInDb = db.Usuario.findOne({
                where: { matricula: matricula },
                raw: true,
                attributes: [ 'matricula' ]
            });
            resolve( matriculaInDb );
        }catch( err ) {
            reject( err );
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
    buscarUsuario,
    buscarMatricula
}