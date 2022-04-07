import React from 'react';
import { Routes, Route, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import CmpLogin from './CmpLogin';


const AppEvaluacionCodigo = () => {
    const RouterList = () => {
        const routesArr = useRoutes([
            { path: '/login',element: <CmpLogin /> }
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