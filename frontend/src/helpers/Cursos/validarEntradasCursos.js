export const validarCrearNuevoCurso = ( data ) => {
    let listaErrores = [];
    if( data.length == 0 ) listaErrores.push( 'Error al ingresar datos' );
    if( data.nombre == undefined || data.nombre.length <= 4 ) listaErrores.push( 'Ingresa un nombre más largo' );
    if( data.descripcion == undefined || data.descripcion.length <= 10 ) listaErrores.push( 'Ingresa una descripción más grande' );
    if( data.nfc == undefined || data.nfc < 8 ) listaErrores.push( 'Genera un NFC' );
    return listaErrores;
}