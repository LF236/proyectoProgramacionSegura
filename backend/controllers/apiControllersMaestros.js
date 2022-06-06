const { obtenerListaDeCursos, obtenerIdMaestro, storageCursoDB, listaAlumnos, obtenerInfoCurso, listaAlumnosInscritos, updateCursoDb, inscribirAlumnos } = require("../helpers/consultasMaestros");

const apiControllersMaestros = {
    getListaCursos: async ( req, res ) => {
        try{
            const idUsuario = req.userId;
            const listaCursos = await obtenerListaDeCursos( idUsuario );
            res.send({
                'listaCursos': listaCursos
            });
        }
        catch( err ){
            console.log( 'SE FUE AL CATCH' );
            console.log( err );
        }
    },

    storageCurso: async ( req, res ) => {
        try {
            const user_id = req.userId;
            // Obtener el id del maestro
            const id_maestro = await obtenerIdMaestro( user_id );
            await storageCursoDB( id_maestro, req.body );
            return res.send( 'OK' );
        }
        catch {
            return res.status( 500 ).send( { error: 'Error en el servidor' } );
        }
    },

    getListaAlumnosFueraDelCursos: async ( req, res ) => {
        try {
            const lista_alumnos = await listaAlumnos();
            // console.log( lista_alumnos );
            return res.send( lista_alumnos );
        }
        catch(err){
            return res.status( 500 ).send( { error: 'Error en el servidor' } );
        }
    },

    getInfoCurso: async ( req, res ) => {
        try {
            const infoCurso = await obtenerInfoCurso( req.query.id_curso );
            console.log( infoCurso );
            res.send( infoCurso );
        }
        catch( err ) {
            console.log( err );
        }
    },

    getListaAlumnosInscritos: async ( req, res ) => {
        try {
            const listaAlumnos = await listaAlumnosInscritos( req.query.id_curso );
            res.send( listaAlumnos );
        }
        catch( err ) {
            return res.send( false );
        }
    },

    updateCurso: async ( req, res ) => {
        const { cursoInfo, listaDeAlumnosInscribir, id_curso } = req.body;
        try {
            // Actualizar información del curso
            await updateCursoDb( id_curso, cursoInfo );
            // Si se seleccionaron alumnos para inscribir los hacemos xd
            console.log( listaDeAlumnosInscribir );
            if( listaDeAlumnosInscribir.length > 0 ) {
                console.log( 'Se vana inscribir alumnos XD' );
                await inscribirAlumnos( id_curso, listaDeAlumnosInscribir );
            }
            res.send( 'OK' );
        }
        catch( err ) {
            console.log( err );
            return res.send( false );
        }
        
    }
}

module.exports = apiControllersMaestros;