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

export const validarCrearEjercicio = ( data ) => {
    console.log( data );
}