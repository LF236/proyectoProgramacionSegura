const validarEntradasPruebaSalida = ( cadena ) => {
    try {
        var array = JSON.parse("[" + cadena + "]");
        return true;
    }
    catch( err ) {
        return false;
    }
}

const entradas_to_json = ( entrada ) => {
    try {
        var array = JSON.parse("[" + entrada + "]");
        return array;
    }
    catch( err ) {
        return false;
    }
}
const validarTipoArchivosValidos = fileName => {
    let extensionesValidas =  /(.sh)$/i;
    if( !extensionesValidas.exec( fileName ) ) {
        return false;
    }
    return true;
}

export const validarCrearNuevoCurso = ( data ) => {
    let listaErrores = [];
    if( data.length == 0 ) listaErrores.push( 'Error al ingresar datos' );

    if( data.nombre == undefined || data.nombre.length == 0 ) listaErrores.push( 'El campo del nombre no debe estar vacio' );
    if( data.nombre == undefined || data.nombre.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco en el campo nombre' );
    if( data.nombre == undefined || data.nombre.length <= 4 ) listaErrores.push( 'Ingresa un nombre más largo' );

    if( data.descripcion == undefined || data.descripcion.length == 0 ) listaErrores.push( 'El campo de descripción no debe estar vacio' );    
    if( data.descripcion == undefined || data.descripcion.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco en el campo de descripción' );    
    if( data.descripcion == undefined || data.descripcion.trim().length <= 10 ) listaErrores.push( 'Ingresa una descripción más grande' );

    if( data.nrc == undefined || data.nrc < 5 ) listaErrores.push( 'Genera un NRC' );
    return listaErrores;
}

export const validarUpdateCurso = ( data ) => {
    let listaErrores = [];
    if( data.length == 0 ) listaErrores.push( 'Error al ingresar datos' );

    if( data.nombre == undefined || data.nombre.length == 0 ) listaErrores.push( 'El campo del nombre no debe estar vacio' );
    if( data.nombre == undefined || data.nombre.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco en el campo nombre' );
    if( data.nombre == undefined || data.nombre.trim().length <= 4 ) listaErrores.push( 'Ingresa un nombre más largo' );

    if( data.descripcion == undefined || data.descripcion.length == 0 ) listaErrores.push( 'El campo de descripción no debe estar vacio' );    
    if( data.descripcion == undefined || data.descripcion.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco en el campo de descripción' );    
    if( data.descripcion == undefined || data.descripcion.trim().length <= 10 ) listaErrores.push( 'Ingresa una descripción más grande' );

    return listaErrores;
}

export const validarCrearEjercicio = ( data, files ) => {
    const listaErrores = [];
    if( Object.keys( data ).length == 0 ) listaErrores.push( 'Error al ingresar datos' );

    if( data.nombre == undefined || data.nombre.length <= 0 ) listaErrores.push( 'El campo nombre no debe estar vacio' );
    if( data.nombre == undefined || data.nombre.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en el nombre' );
    if( data.nombre == undefined || data.nombre.trim().length <= 4 ) listaErrores.push( 'Ingresa un nombre más largo' );
    
    if( data.descripcion == undefined || data.descripcion.length <= 0 ) listaErrores.push( 'El campo de descripción no debe estar vacio' );    
    if( data.descripcion == undefined || data.descripcion.trim().length <= 0 ) listaErrores.push( 'No se permiten espacios en blanco o vacios en la descripción' );
    if( data.descripcion == undefined || data.descripcion.trim().length <= 4 ) listaErrores.push( 'Ingresa una descripción más larga' );
        
    if( data.entradas_prueba == undefined || data.entradas_prueba.length == 0 ) listaErrores.push( 'Ingresa las entradas de prueba' );
    if( data.entradas_prueba == undefined || data.entradas_prueba.trim().length <= 0 ) listaErrores.push( 'No se permite iniciar las entradas de prueba con espacios en blanco' );
    if( !validarEntradasPruebaSalida( data.entradas_prueba ) ) listaErrores.push( 'Formato de entradas de prueba invalido' );

    if( data.salidas_esperadas == undefined || data.salidas_esperadas.length == 0 ) listaErrores.push( 'Ingresa las entradas de salida' );
    if( data.salidas_esperadas == undefined || data.salidas_esperadas.trim().length <= 0 ) listaErrores.push( 'No se permite iniciar con espacios en las entradas de salida' );
    if( !validarEntradasPruebaSalida( data.salidas_esperadas ) ) listaErrores.push( 'Formato de salidas esperadas invalidas' );
    if( ( data.entradas_prueba && data.salidas_esperadas ) &&( entradas_to_json( data.entradas_prueba ).length != entradas_to_json( data.salidas_esperadas ).length ) ) listaErrores.push( 'La cantidad de entradas de pruebas y de salidas debe ser la misma' );
    // Validacion de archivos
    if( files.script_inicializacion == undefined ) listaErrores.push( 'Agrega el Script de inicialización' );
    if( files.script_inicializacion && !validarTipoArchivosValidos( files.script_inicializacion.name ) ) listaErrores.push( 'El Script de inicialización debe ser ".sh"' );
    
    if( files.script_comprobacion_parametros == undefined ) listaErrores.push( 'Agrega el Script de comprobación de parámetros' );
    if( files.script_comprobacion_parametros && !validarTipoArchivosValidos( files.script_comprobacion_parametros.name ) ) listaErrores.push( 'El Script de comprobación de parámetros debe ser ".sh"' );

    // if( files.script_comprobacion_final == undefined ) listaErrores.push( 'Agrega el Script de comprobación final' );
    // if( files.script_comprobacion_final && !validarTipoArchivosValidos( files.script_comprobacion_final.name ) ) listaErrores.push( 'El Script de comprobación de final debe ser ".sh"' );

    return listaErrores;
}

export const validarEntradasIntento = ( files ) => {
    const listaErrores = [];
    if( files.script_intento == undefined ) listaErrores.push( 'Agrega tu Script' );
    if( files.script_intento && !validarTipoArchivosValidos( files.script_intento.name ) ) listaErrores.push( 'El script debe ser .sh' );
    return listaErrores;
}