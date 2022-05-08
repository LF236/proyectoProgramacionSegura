import axios from 'axios';
import { authHeader } from '../services/authHeader';

export const sendLoginData = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/login`;
            axios({
                method: 'POST',
                url: URI,
                data,
            }).then( res => {
                resolve( res );
            } )

        }
        catch( err ) {
            reject( err );
        }
    })
}

export const findUser = () => {
    return new Promise( ( resolve, reject ) => {
        try {
            const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/user`;
            axios.get( URI, { headers: authHeader() } )
            .then( res => {
                resolve( res );
            } )
            .catch( err => {
                reject( false );
            } )
        }
        catch {
            reject( false );
        }
    })
}