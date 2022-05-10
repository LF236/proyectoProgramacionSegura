import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import CmpLoading from './CmpLoading';

const CmpPrivateRoute = ( props ) => {
    const { user, isLoading } = useContext( UserContext );
    const { component: Component, ...rest } = props;

    // Verificamos que el hook no este cargando NADA con la propiedad 'isLoading'
    if( isLoading ) {
        return <CmpLoading />;
    }
   
    if( user ) {
        return( <Component /> );
        // alert( 'Si pasa' )
    } else {
        return <Navigate to='/login/' />;
    }   
}

export default CmpPrivateRoute;