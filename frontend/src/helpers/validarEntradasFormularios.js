const validarEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validarFormularioLogin = ( data = {} ) => {
    let bandForm = true;
    // Si la data es una cadena vacia}
    if( data == '' ) {
        bandForm = false;
        return bandForm;
    }

    // Verificamos que el correo no sea vacio
    if ( data.email == '' ) {
        bandForm = false;
        return bandForm;
    }

    // Verificamos que el email sea valido
    if( !validarEmail( data.email ) ) {
        bandForm = false;
        return bandForm;
    }

    // Verificamos que el password se haya enviado
    if( data.password == undefined ) {
        bandForm = false;
        return bandForm;
    }

    // Verificamos que la cadena no sea vacia
    if( data.password == '' ) {
        bandForm = false;
        return bandForm;
    }
    return bandForm;
}

export const validarFormularioRegistro = ( data = {} ) => {
    // Verificamos que la función reciba data
    if( data == '' ) return false;

    // Verificamos el nombre
    if( data.nombre == undefined || data.nombre.length <= 2 ) return false;

    // Verificamos el apellido parterno
    if( data.apellidoPaterno == undefined || data.apellidoPaterno.length <= 2 ) return false;

    // Verificamos el apellido materno
    if( data.apellidoMaterno == undefined || data.apellidoMaterno.length <= 2 ) return false;

    // Verificamos la matricula
    if( data.matricula == undefined || data.matricula.length <= 2 ) return false;

    // Verificamos el correo
    if( data.correo == undefined || data.correo.length <= 2 ) return false;

    if( !validarEmail( data.correo ) ) return false;

    // Verificamos si el password y el repeat-password se llenaron
    if( data.nuevoPassword == undefined || data.nuevoPassword.length <= 2 ) return false;


    if( data.repitePassword == undefined ) return false;

    // Verificamos que el password y el repitePassword sean iguales
    if( data.nuevoPassword != data.repitePassword ) return false;

    // Verificamos que se haya seleccionado un tipo de cuenta
    if( data.tipoCuenta == undefined ) return false; 

    return true;
}