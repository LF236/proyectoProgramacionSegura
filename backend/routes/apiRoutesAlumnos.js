const express = require( 'express' );
const apiControllersAlumnos = require('../controllers/apiControllersAlumnos');
const verifyJwt = require('../middlewares/verifyJw');
const router = express.Router();

router.get( '/misCursosLista', verifyJwt ,apiControllersAlumnos.misCursos );
router.get( '/listaEjerciciosCursoMoreEjercicios', verifyJwt, apiControllersAlumnos.misEjerciciosMasInfo );
router.get( '/infoEjercicio', verifyJwt ,apiControllersAlumnos.getInfoEjercicio );
router.get( '/ejercicioMisRespuestas', verifyJwt ,apiControllersAlumnos.ejercicioRespuestas );
router.post( '/procesarIntentoEjercicio', apiControllersAlumnos.procesarEjercicios );
module.exports = router;