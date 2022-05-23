const { obtenerListaDeCursos } = require("../helpers/consultasMaestros");

const apiControllersMaestros = {
    getListaCursos: async ( req, res ) => {
        try{
            const idUsuario = req.userId;
            const listaCursos = await obtenerListaDeCursos( idUsuario );
            console.log( `id_usuario: ${ idUsuario }`.red );
            console.log( listaCursos );
            res.send( 'LISTA CURSOS' );
        }
        catch( err ){
            console.log( 'SE FUE AL CATCH' );
            console.log( err );
        }
        
    }
}

module.exports = apiControllersMaestros;