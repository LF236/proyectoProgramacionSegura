const express = require( 'express' );
const apiControllersMaestros = require('../controllers/apiControllersMaestros');
const verifyJwt = require('../middlewares/verifyJw');
const router = express.Router();

router.get( '/listaCursos', verifyJwt, apiControllersMaestros.getListaCursos );
router.post( '/guardarCurso', verifyJwt, apiControllersMaestros.storageCurso );
router.get( '/listaAlumnosFueraCurso', verifyJwt ,apiControllersMaestros.getListaAlumnosFueraDelCursos );
router.get( '/infoCurso', verifyJwt, apiControllersMaestros.getInfoCurso );
router.post( '/actualizarInfoCurso', verifyJwt, apiControllersMaestros.updateCurso );
router.get( '/listaAlumnosInscritos', apiControllersMaestros.getListaAlumnosInscritos );
module.exports = router;