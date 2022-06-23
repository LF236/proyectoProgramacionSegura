require( 'colors' );
require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const morgan = require( 'morgan' );
const fs = require( 'fs' );
const path = require( 'path' );
const app = express();

const port = process.env.PORT;
// Create Write Stream for logs in "Append Mode"
let accesLogStream = fs.createWriteStream( path.join( __dirname, '/logs/bitacora_sistema.log' ), { flags: 'a' } );
app.use( morgan( 'combined', { stream: accesLogStream } ) );
// Config to process data of forms
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

// Setting cors settings
app.use( cors({
    methods: [ 'GET', 'POST' ],
    origin: '*'
}) );
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