import { useEffect, useState } from "react";
import { findUser } from "../helpers/UsersPetitions";

const useFindUser = () => {
    const [ user, setUser ] = useState( null );
    const [ isLoading, setLoading ] = useState( true );
    useEffect( () => {
        findUser()
            .then( res => {
                console.log( res );
                setUser( res.data.currentUser );
                setLoading( false );
            } )
            .catch( err => {
                console.log( 'Error al cargar el Hook' );
                setLoading( false );
            } )
    }, [] );

    return {
        user,
        setUser,
        isLoading
    };
}

export default useFindUser;