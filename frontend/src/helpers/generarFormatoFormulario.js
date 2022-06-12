export const generarFormatoFormulario = ( data, listaArchivos, id_curso ) => {
    const form = new FormData();
    for( let propiedad in data ) {
        form.append( propiedad, data[ propiedad ] );
    }

    for( let propiedad in listaArchivos ) {
        form.append( propiedad, listaArchivos[ propiedad ] );
    }
    form.append( 'id_curso', id_curso );
    return form;
}