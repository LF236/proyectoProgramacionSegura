import React from 'react';
import axios from 'axios';
const CmpHome = () => {
    const getInfo = () => {
        console.log( 'HELLO WORLD' );
        const URI = `http://${ process.env.REACT_APP_IP_API }:8000/api/test`;
        axios.get( URI )
            .then( res => {
                console.log( res );
            } )
    }

    return (
        <>
            <div>CmpHome</div>
            <button onClick={ getInfo }>GetInfoSession</button>
        </>
    );
}

export default CmpHome;