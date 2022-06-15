import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CmpIntentarEjercicio = () => {
    const location = useLocation();
    useEffect( () => {
        console.log( location );
    } );
    return (
        <div>CmpIntentarEjercicio</div>
    );
}

export default CmpIntentarEjercicio;