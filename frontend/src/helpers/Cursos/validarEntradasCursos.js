const validarEntradasPruebaSalida = ( cadena ) => {
    try {
        var array = JSON.parse("[" + cadena + "]");
        return true;
    }
    catch {
        return false;
    }
}

const entradas_to_json = ( entrada ) => {
    var array = JSON.parse("[" + entrada + "]");
    return array;
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
    if( data.nombre == undefined || data.nombre.length <= 4 ) listaErrores.push( 'Ingresa un nombre más largo' );
    if( data.descripcion == undefined || data.descripcion.length <= 10 ) listaErrores.push( 'Ingresa una descripción más grande' );
    if( data.nrc == undefined || data.nfc < 5 ) listaErrores.push( 'Genera un NRC' );
    return listaErrores;
}

export const validarUpdateCurso = ( data ) => {
    let listaErrores = [];
    if( data.length == 0 ) listaErrores.push( 'Error al ingresar datos' );
    if( data.nombre == undefined || data.nombre.length <= 4 ) listaErrores.push( 'Ingresa un nombre más largo' );
    if( data.descripcion == undefined || data.descripcion.length <= 10 ) listaErrores.push( 'Ingresa una descripción más grande' );
    return listaErrores;
}

export const validarCrearEjercicio = ( data, files ) => {
    const listaErrores = [];
    if( Object.keys( data ).length == 0 ) listaErrores.push( 'Error al ingresar datos' );
    if( data.nombre == undefined || data.nombre.length <= 4 ) listaErrores.push( 'Ingresa un nombre más largo' );
    if( data.descripcion == undefined || data.descripcion.length <= 4 ) listaErrores.push( 'Ingresa una descripción más larga' );
    if( data.entradas_prueba == undefined ) listaErrores.push( 'Ingresa las entradas de prueba' );
    if( !validarEntradasPruebaSalida( data.entradas_prueba ) ) listaErrores.push( 'Formato de entradas de prueba invalido' );
    if( data.salidas_esperadas == undefined ) listaErrores.push( 'Ingresa las entradas de salida' );
    if( !validarEntradasPruebaSalida( data.salidas_esperadas ) ) listaErrores.push( 'Formato de salidas esperadas invalidas' );
    if( ( data.entradas_prueba && data.salidas_esperadas ) &&( entradas_to_json( data.entradas_prueba ).length != entradas_to_json( data.salidas_esperadas ).length ) ) listaErrores.push( 'La cantidad de entradas de pruebas y de salidas debe ser la misma' );
    // Validacion de archivos
    if( files.script_inicializacion == undefined ) listaErrores.push( 'Agrega el Script de inicialización' );
    if( files.script_inicializacion && !validarTipoArchivosValidos( files.script_inicializacion.name ) ) listaErrores.push( 'El Script de inicialización debe ser ".sh"' );
    if( files.script_comprobacion_parametros == undefined ) listaErrores.push( 'Agrega el Script de comprobación de parámetros' );
    if( files.script_comprobacion_parametros && !validarTipoArchivosValidos( files.script_comprobacion_parametros.name ) ) listaErrores.push( 'El Script de comprobación de parámetros debe ser ".sh"' );
    if( files.script_comprobacion_final == undefined ) listaErrores.push( 'Agrega el Script de comprobación final' );
    if( files.script_comprobacion_final && !validarTipoArchivosValidos( files.script_comprobacion_final.name ) ) listaErrores.push( 'El Script de comprobación de final debe ser ".sh"' );
    
    return listaErrores;
}