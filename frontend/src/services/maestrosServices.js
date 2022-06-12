import axios from "axios";
import { authHeader } from "./authHeader";

export const getCursosMaestros = () => {
    return new Promise( ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/listaCursos`;
            axios.get( URI, { headers: authHeader() } )
            .then( res => {
                resolve( res );
            } )
            .catch( err => {
                reject( false );
            } )
        }
        catch{
            reject( false );
        }
    } );
}

export const guardarCursoMaestros = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/guardarCurso`;
            axios({
                method: 'POST',
                headers: authHeader(),
                url: URI,
                data
            }).then( res => {
                resolve( res );
            } ).catch( err => {
                reject( err );
            } )
        }
        catch{
            reject( false );
        }
    } );
}

export const getInfoCurso = ( id_curso ) => {
    return new Promise( ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/infoCurso`;
            axios.get( URI, { headers: authHeader(), params: { id_curso } } )
            .then( res => {
                resolve( res.data );
            } )
            .catch( err => {
                reject( false );
            } )
        }
        catch( err ) {
            resolve( false );
        }
    } );
}

export const getAlumnosNoInscritos = () => {
    return new Promise( ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/listaAlumnosFueraCurso`;
            axios.get( URI, { headers: authHeader() } )
            .then( res => {
                resolve( res.data );
            } )
            .catch( err =>{
                reject( false );
            }) 
        }
        catch {
            reject( false );
        }
    } )
}

export const getAlumnosInscritos = ( id_curso ) => {
    return new Promise( ( resolve, reject )  => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/listaAlumnosInscritos`;
            axios.get( URI, { headers: authHeader(), params: { id_curso } } )
            .then( res => {
                console.log( res );
                resolve( res.data );
            } )
            .catch( err => {
                reject( false );
            } )
        }
        catch( err ) {
            console.log( err );
            reject( false );
        }
    })
}

export const updateCurso = ( data, listaDeAlumnosInscribir, id_curso, listaAlumnosInscritos ) => {
    return new Promise( ( resolve, reject ) => {
        try {
            /* 
                Barremos la data de los alumnos a inscribir y solo mandamos el id_usuario
                tambien excluimos a los alumnos que ya se encuentran inscritos
            */
            let arrIdsAlumnosInscrito = listaAlumnosInscritos.map( alumnoInscrito => alumnoInscrito.id );
            let auxListaAlumnosInscribir = [];
            listaDeAlumnosInscribir.map( alumno => {
                // alumno[ 'alumno_usuario.id' ]
                if( !arrIdsAlumnosInscrito.includes( alumno['alumno_usuario.id_usuario'] ) ) {
                    auxListaAlumnosInscribir.push( alumno['alumno_usuario.id'] );
                }                
            } );

            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/actualizarInfoCurso`;
            console.log( auxListaAlumnosInscribir );
            axios({
                method: 'POST',
                headers: authHeader(),
                url: URI,
                data: {
                    cursoInfo: data,
                    listaDeAlumnosInscribir: auxListaAlumnosInscribir,
                    id_curso: id_curso
                }
            })
            .then( res => {
                resolve( res );
            } )
            .catch( err => {
                reject( false );
            } )
        }
        catch( err ) {
            reject( false );
        }
    } );

}

export const guardarEjercicio = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/crearEjercicio`;
            console.log( data );
            
            axios({
                method: 'POST',
                url: URI,
                // headers: { 'Content-Type': 'multipart/form-data' },
                data: data,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }        
            })
            .then( res => {
                // console.log( res );
                resolve( res );
            } )
            .catch( err => {
                if( err.response != undefined && err.response.status == 401 ) {
                    return reject( err.response.data );
                } else {
                    return reject( [ 'Modificaste un archivo ya seleccionado, recarga la página y reinicia el proceso' ] );
                }
            } )

        }
        catch( err ) {
            reject( 'Modificaste un archivo ya seleccionado, recarga la página y reinicia el proceso' );
        }
    } )
}

export const getEjercicios = ( id_curso ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/maestros/ejerciciosCurso`;
            let data = await axios.get( URI, { headers: authHeader(), params: { id_curso } } )
            resolve( data.data );
        }
        catch( err ){
            reject( err );
        }
    })
}