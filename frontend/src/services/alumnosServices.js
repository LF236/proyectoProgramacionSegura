import axios from "axios";
import { authHeader } from "./authHeader";

export const getMisCurso = () => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const URI = `http://localhost:8000/api/alumnos/misCursosLista`;
            let res = await axios.get( URI, { headers: authHeader() } );
            resolve( res.data );
        }
        catch( err ) {
            reject( false );
        }
    })
}

export const getEjerciciosCursoAlumno = ( id_curso ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const URI = `http://localhost:8000/api/alumnos/listaEjerciciosCursoMoreEjercicios`;
            let res = await axios.get( URI, { headers: authHeader(), params: { id_curso: id_curso } } );
            resolve( res.data );
        }
        catch( err ) {
            console.log( err );
            reject( false );
        }
    })
}

export const getEjerciciosMisRespuestas = ( id_ejercicio ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const URI = `http://localhost:8000/api/alumnos/ejercicioMisRespuestas`;
            let res = await axios.get( URI, { headers: authHeader(), params: { id_ejercicio: id_ejercicio } } );
            console.log( res.data );
            resolve( res.data );

        }
        catch( err ){
            console.log( err );
            reject( false );
        }
    } )
}

export const getInfoEjercicio = ( id_ejercicio ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const URI = `http://localhost:8000/api/alumnos/infoEjercicio`;
            let res = await axios.get( URI, { headers: authHeader(), params: { id_ejercicio: id_ejercicio } } );
            resolve( res.data );
        }
        catch( err ) {
            reject( false );
        }
    } )
}

export const subirIntentoEjercicio = ( id_ejercicio, file ) => {
    return new Promise( async ( resolve, reject ) => {
        try{
            let form = new FormData();
            form.append( 'id_ejercicio', id_ejercicio );
            form.append( 'script_intento', file.script_intento );
            
            const URI = `http://localhost:8000/api/alumnos/procesarIntentoEjercicio`;
            let res = await axios( { 
                method: 'POST', 
                url: URI, 
                data: form,
                headers: authHeader(),
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            } );
            resolve( res );
        }
        catch( err ) {
            reject( false );
        }
    } )
}