const { obtenerListaDeCursos, obtenerIdMaestro, storageCursoDB } = require("../helpers/consultasMaestros");

const apiControllersMaestros = {
    getListaCursos: async ( req, res ) => {
        try{
            const idUsuario = req.userId;
            const listaCursos = await obtenerListaDeCursos( idUsuario );
            res.send({
                'listaCursos': listaCursos
            });
        }
        catch( err ){
            console.log( 'SE FUE AL CATCH' );
            console.log( err );
        }
    },

    storageCurso: async ( req, res ) => {
        try {
            const user_id = req.userId;
            // Obtener el id del maestro
            const id_maestro = await obtenerIdMaestro( user_id );
            await storageCursoDB( id_maestro, req.body );
            return res.send( 'OK' );
        }
        catch {
            return res.status( 500 ).send( { error: 'Error en el servidor' } );
        }
    }
}

module.exports = apiControllersMaestros;