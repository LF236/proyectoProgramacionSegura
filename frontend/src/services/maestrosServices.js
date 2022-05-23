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