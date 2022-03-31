const express = require( 'express' );
const router = express.Router();
const apiControllers = require( '../controllers/apiControllers' );
router.get( '/', apiControllers.home );

module.exports = router;