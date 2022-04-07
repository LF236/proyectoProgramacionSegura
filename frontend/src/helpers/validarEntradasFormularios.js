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