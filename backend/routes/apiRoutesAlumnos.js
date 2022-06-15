const express = require( 'express' );
const apiControllersAlumnos = require('../controllers/apiControllersAlumnos');
const verifyJwt = require('../middlewares/verifyJw');
const router = express.Router();

router.get( '/misCursosLista', verifyJwt ,apiControllersAlumnos.misCursos );
router.get( '/listaEjerciciosCursoMoreEjercicios', verifyJwt, apiControllersAlumnos.misEjerciciosMasInfo );
router.get( '/ejercicioMisRespuestas', apiControllersAlumnos.ejercicioRespuestas );
module.exports = router;