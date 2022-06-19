const calificarEjercicioAlumno = require("../helpers/calificarEjercicioAlumno");
const { obtenerMisCursos, getEjerciciosCurso, getInfoEjercicioRespuestas, getInfoEjercicioDb, almacenarResultadoDb } = require("../helpers/consultasAlumnos");

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
            let ejercicioRes = await getInfoEjercicioRespuestas( id_ejercicio, req.userId );
            res.send( ejercicioRes );
        }
        catch( err ) {
            console.log( err );
            res.status( 500 ).send( 'Error en el servidor' );
        }
    },

    getInfoEjercicio: async ( req, res ) => {
        try {
            let id_ejercicio = req.query.id_ejercicio;
            let ejercicioInfo = await getInfoEjercicioDb( id_ejercicio );
            res.send( ejercicioInfo );
        }
        catch( err ) {
            res.status( 500 ).send( 'Error en el servidor' );
        }
    },

    procesarEjercicios: async ( req, res ) => {
        try {        
            let resultado = await calificarEjercicioAlumno( req.body.id_ejercicio );
            await almacenarResultadoDb( req.userId, req.body.id_ejercicio, resultado );
            // console.log( resultado );
            res.send( 'OK' );
        } catch( err ) {
            res.status( 500 ).send( 'Error en el servidor' );
        }
    }
}

module.exports = apiControllersAlumnos;