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

export const updateCurso = ( data ) => {
    
}