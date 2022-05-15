import React, { useState } from 'react';
import CmpModalCodigoVerificacion from './Auth/CmpModalCodigoVerificacion';

const CmpTest = () => {
    const [ openModal, setOpenModal ] = useState( false );
    const handleShowModal = () => {
        setOpenModal( true );
    }

    return (
        <>  
            <CmpModalCodigoVerificacion bandShowModal={ openModal } setOpenModal={ setOpenModal }/>
            <p>CmpTest</p>
            <button onClick={ handleShowModal }>Mostrar modal</button>
        </>
    );
}

export default CmpTest;