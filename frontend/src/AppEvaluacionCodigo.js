import React from 'react';
import { Routes, Route, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import CmpLogin from './components/CmpLogin';
import CmpRegistro from './components/CmpRegistro';
import CmpHome from './components/CmpHome';
import CmpHeader from './components/CmpHeader';
import CmpFooter from './components/CmpFooter';
import './styles.css';
import useFindUser from './hooks/useFindUser';
import CmpLanding from './components/CmpLanding';
import CmpPrivateRoute from './components/CmpPrivateRoute';
const AppEvaluacionCodigo = () => {
    const { user, setUser, isLoading } = useFindUser();
    const RouterList = () => {
        const routesArr = useRoutes([
            { path: '/', element: <CmpLanding />, index: true},
            { path: '/home', element: <CmpHome /> },
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
                <UserContext.Provider value={ { user, setUser, isLoading } }>
                    <Router styles={ { backgroundColor: 'red' } }>
                        <RouterList/>
                    </Router>
                </UserContext.Provider>
            </main>
            <CmpFooter />
        </>
    );
}

export default AppEvaluacionCodigo;