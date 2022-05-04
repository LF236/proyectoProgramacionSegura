import axios from 'axios';
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

export const logout = () => {
    const userInfo = localStorage.getItem( 'userInfo' );
    if( userInfo ) {
        localStorage.removeItem( 'userInfo' );
    } else {
        return;
    }
}