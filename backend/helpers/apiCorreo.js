require( 'dotenv' ).config( { path: '../.env' } );
const nodeMailer = require( 'nodemailer' );
const path = require( 'path' );
const handlebars = require( 'handlebars' );
const fs = require('fs');

const generateVerificationCode = () => {
    const min = 1000;
    const max = 9999;
    return parseInt( Math.random() * ( max - min ) + ( min ) )
}

const transporter = nodeMailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_API,
        pass: process.env.PASS_EMAIL_API
    }
});

// Funcion para enviar un correo electronico
const sendVerificationCode = ( emailTo, nombre, codigoVerificacion ) => {
    return new Promise( ( resolve, reject ) => {
        const emailPath = path.join( __dirname, '../views/enviarCodigoDeVerificacion.html' );
        const source = fs.readFileSync( emailPath, 'utf-8' ).toString();
        const template = handlebars.compile( source );
        const replacements = {
            codigoVerificacion: codigoVerificacion,
            nombre: nombre
        };
        const htmlToSend = template( replacements );
        // Información de destino
        const mailOptions = {
            from: process.env.EMAIL_API,
            to: emailTo,
            subject: 'Sistema de evaluación de código UV - LF236',
            html: htmlToSend
        };

        // Enviamos el mensaje
        transporter.sendMail( mailOptions, ( error, info ) =>{
            if( error ) {
                console.log( error );
                reject( false );
            } else {
                resolve( true );
            }
        } )
    })
}

module.exports = {
    sendVerificationCode,
    generateVerificationCode
}