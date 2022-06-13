import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CmpAlumoInfoEjercicio = () => {
    const location = useLocation();
    useEffect( () => {
        let id_ejercicio = location.state.id_ejercicio;
        console.log( id_ejercicio );
    }, [] )
    
    return (
        <div>CmpAlumoInfoEjercicio</div>
    );
}

export default CmpAlumoInfoEjercicio;