const express = require( 'express' );
const multer = require( 'multer' );
const path = require( 'path' );
const fs = require( 'fs' );
const apiControllersAlumnos = require('../controllers/apiControllersAlumnos');
const verifyJwt = require('../middlewares/verifyJw');
const router = express.Router();

const storage = multer.diskStorage({
    destination: ( req, file, callback ) => {
        let rutaAbsoluta = path.resolve( __dirname, `../files/ejercicios/${req.body.id_ejercicio}` );
        if( fs.existsSync( `${ rutaAbsoluta }/tmp` ) ) {
            fs.rmSync( `${ rutaAbsoluta }/tmp`, { force: true, recursive: true } );
        }

        fs.mkdirSync( `${ rutaAbsoluta }/tmp` );
        callback( null, `${ rutaAbsoluta }/tmp` );
    },

    filename: ( req, file, callback ) => {
        callback( null, 'script_alumno_tmp.sh' );
    }
});

const upload = multer( { storage, limits: { fileSize: 5000000 } } );
router.get( '/misCursosLista', verifyJwt ,apiControllersAlumnos.misCursos );
router.get( '/listaEjerciciosCursoMoreEjercicios', verifyJwt, apiControllersAlumnos.misEjerciciosMasInfo );
router.get( '/infoEjercicio', verifyJwt ,apiControllersAlumnos.getInfoEjercicio );
router.get( '/ejercicioMisRespuestas', verifyJwt ,apiControllersAlumnos.ejercicioRespuestas );

router.post( '/procesarIntentoEjercicio', verifyJwt ,upload.single( 'script_intento' ) ,apiControllersAlumnos.procesarEjercicios );
module.exports = router;