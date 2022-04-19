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
    let listaErrores = [];
    // Verificamos que la función reciba data
    if( data == '' ) listaErrores.push( 'Error al ingresar los datos' );

    // Verificamos el nombre
    if( data.nombre == undefined || data.nombre.length <= 2 ) listaErrores.push( 'Ingresa un nombre más largo' );

    // Verificamos el apellido parterno
    if( data.apellidoPaterno == undefined || data.apellidoPaterno.length <= 2 ) listaErrores.push( 'Ingresa un apellido paterno más largo' );

    // Verificamos el apellido materno
    if( data.apellidoMaterno == undefined || data.apellidoMaterno.length <= 2 ) listaErrores.push( 'Ingresa un apellido materno más largo' );

    // Verificamos la matricula
    if( data.matricula == undefined || data.matricula.length <= 2 ) listaErrores.push( 'Ingresa una matricula valida' );

    // Verificamos el correo
    if( data.correo == undefined || data.correo.length <= 2 ) listaErrores.push( 'Ingresa un correo valido' );

    if( !validarEmail( data.correo ) ) listaErrores.push( 'Ingresa un correo valido' );

    // Verificamos si el password y el repeat-password se llenaron
    if( data.nuevoPassword == undefined || data.nuevoPassword.length <= 2 ) listaErrores.push( 'Ingresa una contraseña más larga' );


    if( data.repitePassword == undefined ) listaErrores.push( 'Repite la contraseña' );

    // Verificamos que el password y el repitePassword sean iguales
    if( data.nuevoPassword != data.repitePassword ) listaErrores.push( 'Las contraseñas deben coincidir' );

    // Verificamos que se haya seleccionado un tipo de cuenta
    if( data.tipoCuenta == undefined ) listaErrores.push( 'Selecciona el tipo de cuenta' ); 

    return listaErrores;
}