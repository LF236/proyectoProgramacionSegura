const express = require( 'express' );
const apiControllersMaestros = require('../controllers/apiControllersMaestros');
const verifyJwt = require('../middlewares/verifyJw');
const router = express.Router();

router.get( '/listaCursos', verifyJwt, apiControllersMaestros.getListaCursos );
router.post( '/guardarCurso', verifyJwt, apiControllersMaestros.storageCurso );

module.exports = router;