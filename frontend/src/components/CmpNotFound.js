import React from 'react';
import imgLogo from '../assets/img/luzio.gif';
const CmpNotFound = () => {
    return (
        <>
            <section className='not-found'>
                <div className='not-found-top'>
                    <img src={ imgLogo }/>
                </div>

                <div className='not-found-bottom'>
                    <h2>Error 404</h2>
                    <small>Recurso NO encontrado</small>
                </div>
                
            </section>
        </>
    );
}

export default CmpNotFound;