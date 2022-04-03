export const validarFormularioLogin = ( data = {} ) => {
    const listaErrores = [];
    console.log( data );
    // Si la data es una cadena vacia}
    if( data == "" ) {
        listaErrores.push( 'Datos vacios' );
        return listaErrores;
    }
}