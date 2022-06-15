const { obtenerMisCursos, getEjerciciosCurso, getInfoEjercicioRespuestas } = require("../helpers/consultasAlumnos");

const apiControllersAlumnos = {
    misCursos: async ( req, res ) => {
        try{
            const userId = req.userId;
            let misCursos = await obtenerMisCursos( userId );
            return res.send( misCursos );            
        }
        catch( err ) {
            res.status( 500 ).send( 'Error en el servidor' );
        }
    },

    misEjerciciosMasInfo: async ( req, res ) => {
        try {
            let id_curso = req.query.id_curso;
            let ejercicios = await getEjerciciosCurso( id_curso );
            res.send( ejercicios );
        }
        catch( err ) {
            res.status( 500 ).send( 'Error en el servidor' );
        }
    },

    ejercicioRespuestas: async ( req, res ) => {
        try {
            let id_ejercicio = req.query.id_ejercicio;
            console.log( `${ id_ejercicio }`.blue );
            let ejercicioRes = await getInfoEjercicioRespuestas( id_ejercicio );
            res.send( ejercicioRes );
        }
        catch( err ) {
            console.log( err );
            res.status( 500 ).send( 'Error en el servidor' );
        }
    }
}

module.exports = apiControllersAlumnos;