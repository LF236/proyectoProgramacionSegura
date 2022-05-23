import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';
import { authHeader } from '../services/authHeader';
import { Navigate } from 'react-router-dom';
import CmpLoading from './CmpLoading';

const CmpHome = () => {
    const { user, isLoading } = useContext( UserContext );
    if( isLoading ) {
        return <CmpLoading />
    }
    console.log( 'VA PAL HOME' );
    if( user.tipo == 'MAESTRO' ) {
        return <Navigate to='/maestros' />
    } else if( user.tipo == 'ALUMNO' ) {
        return <Navigate to='/alumnos' />
    }
   
}

export default CmpHome;