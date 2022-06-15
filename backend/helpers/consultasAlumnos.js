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

const getInfoEjercicioRespuestas = ( id_ejercicio ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            let ejercicioRespuesta = await db.Ejercicio.findAll({
                raw: true,
                where: { id: id_ejercicio },
                include: [ 'RespuestaAlumno' ]
            } );
            console.log( ejercicioRespuesta );
            resolve( ejercicioRespuesta );
        }
        catch( err ) {
            console.log( err );
            reject( false );
        }
    } )
}

module.exports = {
    obtenerMisCursos,
    getEjerciciosCurso,
    getInfoEjercicioRespuestas
}
// INSERT INTO Respuesta VALUES( '6b6c13bb-7a29-437d-8c34-70d91c9c6c98', '65990152-b9f8-40cb-a41a-1f15ed4b1d4d', 'db13c9ff-4b42-47db-9141-6035613864b8', 10, '2022-06-13 23:58:46', '2022-06-13 23:58:46' );
