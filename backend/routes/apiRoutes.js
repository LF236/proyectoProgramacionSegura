const express = require( 'express' );
const router = express.Router();
const apiControllers = require( '../controllers/apiControllers' );
router.get( '/', apiControllers.home );
router.post( '/login', apiControllers.processLogin );
module.exports = router;