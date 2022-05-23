const express = require( 'express' );
const apiControllersMaestros = require('../controllers/apiControllersMaestros');
const verifyJwt = require('../middlewares/verifyJw');
const router = express.Router();
router.get( '/listaCursos', verifyJwt, apiControllersMaestros.getListaCursos );
module.exports = router;