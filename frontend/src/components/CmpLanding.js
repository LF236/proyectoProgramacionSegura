import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { Navigate } from 'react-router-dom';
const CmpLanding = () => {
    const { user } = useContext( UserContext );
    // Si el usuario existe en el contexto redirigimos al home
    if( user ) {
        return <Navigate to='/home/' />
    }
    
    const testingComponenet = () => {
        console.log( user );
    }

    return (
        <>
            <div>CmpLanding</div>
            <button onClick={ testingComponenet }>Testing Component</button>
        </>
    );
}

export default CmpLanding;