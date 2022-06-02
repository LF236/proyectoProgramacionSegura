const { obtenerListaDeCursos, obtenerIdMaestro, storageCursoDB, listaAlumnos, obtenerInfoCurso, listaAlumnosInscritos } = require("../helpers/consultasMaestros");

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

    updateCurso: ( req, res ) => {
        res.send( 'HOLI' );
    }
}

module.exports = apiControllersMaestros;