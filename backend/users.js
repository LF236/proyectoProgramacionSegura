require('dotenv').config();
const path = require( 'path' );
const fs = require( 'fs' );
const db = require( './database/models' );
// Insertar Data de maestros
// const inserData = async () => {
//     try {
//         await db.Usuario.create({
//             id: 'bf7f6eb3-51a9-4e00-b4d7-298a628774dd',
//             nombre: 'LUIS FERNANDO',
//             apellidoPaterno: 'RODRIGUEZ',
//             apellidoMaterno: 'HERNANDEZ',
//             correo: 'fernandorodriguez236@gmail.com',
//             matricula: 'S18014083',
//             password: '$2a$12$fx8gkZ8VLK13GGk/0uWmSuDNVFqXcPVnbHSg5DbktdpQXh8yCA6MK'
//         });
//         await db.Maestro.create({
//             id: '41320a1d-3228-4dca-a4e7-b22651e71a43',
//             id_usuario: 'bf7f6eb3-51a9-4e00-b4d7-298a628774dd'
//         })
//     }
//     catch(err) {
//         console.log( err );
//     }

// }
// inserData()

const insertAlumnosData = () => {
    try {
        // Leer la lista de alumnos
        const listaUsuarios = JSON.parse( fs.readFileSync( path.resolve( __dirname, './database/seeders/usuarios.json' ), 'utf-8' ) );
        // Leer lista de maestros
        const listaAlumnos = JSON.parse( fs.readFileSync( path.resolve( __dirname, './database/seeders/alumnos.json' ), 'utf-8' ) );
        
        // Inyectamos la data
        // const promiseListaUsuario = listaUsuarios.map( usuario => {
        //     return db.Usuario.create( usuario );
        // } );


        const promiseListaAlumnos = listaAlumnos.map( alumno => {
            return db.Alumno.create( alumno );
        } );

        console.log( promiseListaAlumnos );
    } 
    catch( err ) {
        console.log( err );
    }
}

insertAlumnosData()
// console.log( process.env.DB_NAME );