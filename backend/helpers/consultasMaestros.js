const db = require( '../database/models' );
const obtenerListaDeCursos = idUsuario => {
    return new Promise( async ( resolve, reject ) => {
        try {
            // Obtener id_maestro
            let id_maestro = await db.Maestro.findOne( { raw: true, where: { id_usuario: idUsuario }, attributes: [ 'id' ] } );
            id_maestro = id_maestro.id;
            // Obtener la lista de cursos con base al id del maestro
            let lista_cursos = await db.Curso.findAll( { raw: true, where: { id_profesor: id_maestro } } );
            console.log( lista_cursos );
            resolve( id_maestro );
        }
        catch {
            reject( false );
        }
    } );
}

module.exports = {
    obtenerListaDeCursos
}