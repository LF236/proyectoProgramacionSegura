const express = require( 'express' );
const apiControllersMaestros = require('../controllers/apiControllersMaestros');
const verifyJwt = require('../middlewares/verifyJw');
const router = express.Router();
const multer = require( 'multer' );
const generateIdEjercicio = require('../middlewares/generateIdEjercicio');
const fs = require( 'fs' );
const path = require( 'path' );

const storage = multer.diskStorage({
    destination: ( req, file, callback ) => {
        let pathDirEjercicios =  path.join( __dirname, '../', 'files/ejercicios' );
        let pathEjercicio = path.join( pathDirEjercicios, req.id_ejercicio );
        // Verificar si existe un folder con el nombre del id del ejercicio, si no crearlo
        if( !fs.existsSync( pathEjercicio ) ) {
            fs.mkdirSync( pathEjercicio );
        }
        callback( null, pathEjercicio );
    },

    filename: ( req, file, callback ) => {
        if( file.fieldname == 'script_inicializacion' ) {
            callback( null, 'script_inicializacion.sh' );
        }

        if( file.fieldname == 'script_comprobacion_parametros' ) {
            callback( null, 'script_comprobacion_parametros.sh' );
        }

        if( file.fieldname == 'script_comprobacion_final' ) {
            callback( null, 'script_comprobacion_final.sh' );
        }
    }
});
const upload = multer( { storage } );

router.get( '/listaCursos', verifyJwt, apiControllersMaestros.getListaCursos );
router.post( '/guardarCurso', verifyJwt, apiControllersMaestros.storageCurso );
router.get( '/listaAlumnosFueraCurso', verifyJwt ,apiControllersMaestros.getListaAlumnosFueraDelCursos );
router.get( '/infoCurso', verifyJwt, apiControllersMaestros.getInfoCurso );
router.post( '/actualizarInfoCurso', verifyJwt, apiControllersMaestros.updateCurso );
router.get( '/listaAlumnosInscritos', verifyJwt ,apiControllersMaestros.getListaAlumnosInscritos );
router.get( '/ejerciciosCurso', verifyJwt, apiControllersMaestros.getEjerciciosCurso );
router.get( '/getAllRespuestasEjercicio', verifyJwt, apiControllersMaestros.getAllRespuestas );
router.post( '/crearEjercicio', generateIdEjercicio, upload.fields( [ { name: 'script_inicializacion', maxCount: 1 }, { name: 'script_comprobacion_parametros', maxCount: 1 }, { name: 'script_comprobacion_final', maxCount: 1 } ] ) ,apiControllersMaestros.guardarEjercicio );
module.exports = router;