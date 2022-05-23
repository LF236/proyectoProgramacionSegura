require('dotenv').config();
const db = require( './database/models' );
const inserData = async () => {
    try {
        await db.Usuario.create({
            id: 'bf7f6eb3-51a9-4e00-b4d7-298a628774dd',
            nombre: 'LUIS FERNANDO',
            apellidoPaterno: 'RODRIGUEZ',
            apellidoMaterno: 'HERNANDEZ',
            correo: 'fernandorodriguez236@gmail.com',
            matricula: 'S18014083',
            password: '$2a$12$fx8gkZ8VLK13GGk/0uWmSuDNVFqXcPVnbHSg5DbktdpQXh8yCA6MK'
        });
        await db.Maestro.create({
            id: '41320a1d-3228-4dca-a4e7-b22651e71a43',
            id_usuario: 'bf7f6eb3-51a9-4e00-b4d7-298a628774dd'
        })
    }
    catch(err) {
        console.log( err );
    }

}
inserData()

console.log( process.env.DB_NAME );