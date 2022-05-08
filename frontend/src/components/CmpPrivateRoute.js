import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
const CmpPrivateRoute = ( props ) => {
    const { user, isLoading } = useContext( UserContext );
    console.log( `Componente Rutas Privadas: ${ user } --> ${ isLoading }` );
    const { component: Component, ...rest } = props;

    if( user ) {
        return( <Route { ...rest } render={ ( props ) => ( <Component { ...props } /> ) } /> );
    } else {
        return <Navigate to='/login/' />
    }
}

export default CmpPrivateRoute;