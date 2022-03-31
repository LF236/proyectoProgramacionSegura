require( 'colors' );
require( 'dotenv' ).config();
const express = require( 'express' );
const app = express();

const port = process.env.PORT;

// Config to process data of forms
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

// Config file of routes
const apiRoutes = require( './routes/apiRoutes' );
app.use( '/api', apiRoutes );

// Listening to server
app.listen( port, () => {
    console.log( `Server is ready in http://localhost:${ port }`.rainbow );
} );