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
import CmpNotFound from './components/CmpNotFound';
const AppEvaluacionCodigo = () => {
    const { user, setUser, isLoading } = useFindUser();
    const RouterList = () => {
        const routesArr = useRoutes([
            { path: '/', element: <CmpLanding /> },
            // { path: '/home', element: <CmpHome /> },
            { path: '/login', element: <CmpLogin /> },
            { path:  '/registro', element: <CmpRegistro />},
            { path: '/test', element: <CmpFooter /> },
            { path: '/home', element: <CmpPrivateRoute component={ CmpHome } />, index: true },
            { path: '*', element: <CmpNotFound /> }
            // { path: '/home', element:  }
        ]);
        return routesArr;
    } 

    return (
        <>
            <CmpHeader userInfo={ user } />
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