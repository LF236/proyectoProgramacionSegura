import React from 'react';
import { Routes, Route, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import CmpLogin from './components/CmpLogin';
import CmpRegistro from './components/CmpRegistro';
import CmpHome from './components/CmpHome';
import CmpHeader from './components/CmpHeader';
import CmpFooter from './components/CmpFooter';
import './styles.css';
const AppEvaluacionCodigo = () => {
    const RouterList = () => {
        const routesArr = useRoutes([
            { path: '/', element: <CmpHome />, index: true },
            { path: '/login', element: <CmpLogin /> },
            { path:  '/registro', element: <CmpRegistro />},
            { path: '/test', element: <CmpFooter /> }
        ]);
        return routesArr;
    } 
    return (
        <>
            <CmpHeader />
            <main>
                <Router styles={ { backgroundColor: 'red' } }>
                    <RouterList/>
                </Router>
            </main>
            <CmpFooter />
        </>
    );
}

export default AppEvaluacionCodigo;