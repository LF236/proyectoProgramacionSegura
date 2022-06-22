const validarEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const validarCodigo = codigo => {
    const re = new RegExp( '^[0-9]*$' );
    return re.test( codigo );
}

const validarMatricula = ( mat = '' ) => {
    if( mat[ 0 ] != 'S' ) {
        return false;
    }
    if( mat.length < 9 || mat.length > 9 ) {
        return false;
    }
    let numbers = mat.substring( 1, 9 );
    if( isNaN( numbers ) ) {
        return false;
    }
    
    return true;
}

const validarEspaciosEnBlanco = cad => {
    console.log( cad );
    if (/\s/.test( cad )) {
        return false;
    }
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
    if( data.nombre == undefined ) listaErrores.push( 'El campo del nombre no debe estar vacio' );
    if( data.nombre == undefined || data.nombre.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en el nombre' );
    if( data.nombre == undefined || data.nombre.trim().length <= 2 ) listaErrores.push( 'Ingresa un nombre más largo' );


    // Verificamos el apellido parterno
    if( data.apellidoPaterno == undefined || data.apellidoPaterno.length == 0 ) listaErrores.push( 'El campo del apellido paterno no debe estar vacio' );
    if( data.apellidoPaterno == undefined || data.apellidoPaterno.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en el apellido paterno' );
    if( data.apellidoPaterno == undefined || data.apellidoPaterno.trim().length <= 2 ) listaErrores.push( 'Ingresa un apellido paterno más largo' );

    // Verificamos el apellido materno
    if( data.apellidoMaterno == undefined || data.apellidoMaterno.length == 0 ) listaErrores.push( 'El campo del apellido materno no debe estar vacio' );
    if( data.apellidoMaterno == undefined || data.apellidoMaterno.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en el apellido materno' );
    if( data.apellidoMaterno == undefined || data.apellidoMaterno.trim().length <= 2 ) listaErrores.push( 'Ingresa un apellido materno más largo' );

    // Verificamos la matricula
    if( data.matricula == undefined || data.matricula.length == 0 ) listaErrores.push( 'El campo de la matricula no debe estar vacio' );
    if( data.matricula == undefined || data.matricula.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en la matricula' );
    if( data.matricula == undefined || data.matricula.trim().length <= 2 ) listaErrores.push( 'Ingresa una matricula valida' );
    if( !validarMatricula( data.matricula ) ) listaErrores.push( 'Formato de matricula invalido, el formato es: Sxxxxxxx' )

    // Verificamos el correo
    if( data.correo == undefined || data.correo.length == 0 ) listaErrores.push( 'El campo de correo no debe estar vacio' );
    if( data.correo == undefined || data.correo.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en el correo' );
    if( data.correo == undefined || data.correo.trim().length <= 2 ) listaErrores.push( 'Ingresa un correo valido' );
    if( !validarEmail( data.correo ) ) listaErrores.push( 'Ingresa un correo valido' );

    // Verificamos si el password y el repeat-password se llenaron
    if( data.nuevoPassword == undefined || data.nuevoPassword.length == 0 ) listaErrores.push( 'El campo de la contraseña no debe estar vacio' );
    if( data.nuevoPassword == undefined || data.nuevoPassword.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en la contraseña' );
    if( data.nuevoPassword == undefined || data.nuevoPassword.trim().length <= 2 ) listaErrores.push( 'Ingresa una contraseña más larga' );
    if( !validarEspaciosEnBlanco( data.nuevoPassword ) ) listaErrores.push( 'No se permiten espacios en la contraseña' );

    if( data.repitePassword == undefined ) listaErrores.push( 'Repite la contraseña' );

    // Verificamos que el password y el repitePassword sean iguales
    if( data.nuevoPassword != data.repitePassword ) listaErrores.push( 'Las contraseñas deben coincidir' );

    // Verificamos que se haya seleccionado un tipo de cuenta
    if( data.tipoCuenta == undefined ) listaErrores.push( 'Selecciona el tipo de cuenta' );

    return listaErrores;
}

export const validarCodigoVerificacionRegistro = ( data = {} ) => {
    const listaErrores = [];
    const { codigoVerificacion } = data;
    if( codigoVerificacion.trim().length <= 1 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en el código de verificacion' )
    if( codigoVerificacion.length == 0 ) listaErrores.push( 'Introduce el código de verificación' );
    if( codigoVerificacion.length < 4 ) listaErrores.push( 'El código de verificación es incorrecto' );
    if( !validarCodigo( codigoVerificacion ) ) listaErrores.push( 'Verifica que el código sea correcto' );

    return listaErrores;
}