import React from 'react';
import { Routes, Route, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import CmpLogin from './components/CmpLogin';
import CmpRegistro from './components/CmpRegistro';
import CmpHome from './components/CmpHome';

const AppEvaluacionCodigo = () => {
    const RouterList = () => {
        const routesArr = useRoutes([
            { path: '/', element: <CmpHome />, index: true },
            { path: '/login', element: <CmpLogin /> },
            { path:  '/registro', element: <CmpRegistro />}
        ]);
        return routesArr;
    } 
    return (
        <>
            <Router>
                <RouterList />
            </Router>
        </>
    );
}

export default AppEvaluacionCodigo;