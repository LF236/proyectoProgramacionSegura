require( 'colors' );
require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const app = express();

const port = process.env.PORT;

// Config to process data of forms
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

// Setting cors settings
app.use( cors() );
// Config file of routes
const apiRoutes = require( './routes/apiRoutes' );
app.use( '/api', apiRoutes );
// Config files of routes teachers
const apiRoutesMaestros = require( './routes/apiRoutesMaestros' );
app.use( '/api/maestros', apiRoutesMaestros );
// Config files of routes Students
const apiRoutesAlumnos = require( './routes/apiRoutesAlumnos' );
app.use( '/api/alumnos', apiRoutesAlumnos );
// Listening to server
app.listen( port, () => {
    console.log( `Server is ready in http://localhost:${ port }`.rainbow );
} );