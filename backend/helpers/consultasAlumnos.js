const db = require( '../database/models' );
const obtenerMisCursos = ( id_usuario ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            let id_alumno = await db.Alumno.findOne({
                where: { id_usuario: id_usuario },
                raw: true
            });
            id_alumno = id_alumno.id;
            let misCursos = await db.Curso.findAll({
                raw: true,
                include: [ 'alumnos_inscritos' ],
                where: { '$alumnos_inscritos.ListaAlumnos.id_alumno$' : id_alumno },
                attributes: [ 'id', 'nombre', 'nrc', 'createdAt' ]
            });   
            resolve( misCursos );
        }
        catch( err ) {
            reject( err );
        }
    } )
}

const getEjerciciosCurso = ( id_curso ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            let listaEjercicios = await db.Ejercicio.findAll({
                where: {
                    id_curso: id_curso
                },
                raw: true,
                attributes: [ 'nombre', 'createdAt', 'id' ]
            });
            resolve( listaEjercicios );
        }
        catch( err ) {
            reject( false );
        }
    })
}

module.exports = {
    obtenerMisCursos,
    getEjerciciosCurso
}