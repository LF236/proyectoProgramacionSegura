import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';
import { authHeader } from '../services/authHeader';

const CmpHome = () => {
    const { user, isLoading } = useContext( UserContext );
    const getInfo = () => {
        console.log( 'HELLO WORLD' );
        const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/test`;
        axios.get( URI, { headers: authHeader() } )
            .then( res => {
                console.log( res );
            } )
    }

    const globalVars = () => {
        const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/user`;
        axios.get( URI, { headers: authHeader() } )
            .then( res => {
                console.log( res );
            } )
            .catch( err => {
                console.log( 'Error alv' );
                console.log( err );
            } )
    }

    return (
        <>
            <div>CmpHome</div>
            <button onClick={ globalVars }>GetInfoSession</button>
        </>
    );
}

export default CmpHome;