const express = require( 'express' );
const router = express.Router();
const apiControllers = require( '../controllers/apiControllers' );
const verifyJwt = require( '../middlewares/verifyJw' );

router.get( '/', apiControllers.home );
router.post( '/login', apiControllers.processLogin );
router.get('/test', verifyJwt ,apiControllers.test);
module.exports = router;