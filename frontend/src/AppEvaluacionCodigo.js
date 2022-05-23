import React from 'react';
import { Routes, Route, BrowserRouter as Router, useRoutes, Navigate, Outlet } from 'react-router-dom';
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
import CmpNuevoCurso from './components/Maestros/CmpNuevoCurso';
import CmpMaestrosCursos from './components/Maestros/CmpMaestrosCursos';
import CmpTest from './components/CmpTest';
import CmpAlumnosCursos from './components/Alumnos/CmpAlumnosCursos';
import CmpLoading from './components/CmpLoading';
const AppEvaluacionCodigo = () => {
    const { user, setUser, isLoading } = useFindUser();
    const RouterList = () => {
        const routesArr = useRoutes([
            { path: '/', element: <CmpLanding /> },
            { path: '/login', element: <CmpLogin /> },
            { path:  '/registro', element: <CmpRegistro />},
            { path: '/home', element: <CmpPrivateRoute component={ CmpHome } />, index: true },
            { path: '/test', element: <CmpNuevoCurso /> },
            // Rutas para maestros
            {
                path: '/maestros',
                element: user && user.tipo == 'MAESTRO' ? <Outlet /> : <Navigate to='/home'/> ,
                children: [
                    { path: '' , element: <CmpMaestrosCursos /> },
                    { path: 'crearCurso', element: <CmpNuevoCurso /> }
                ]
                
            },
            // Rutas para alumnos 
            {
                path: '/alumnos',
                element: user && user.tipo == 'ALUMNO' ? <CmpAlumnosCursos /> : <Navigate to='/home'/>
            },
            { path: '*', element: <CmpNotFound /> }
        ]);
        return routesArr;
    } 
    if( isLoading ) {
        return <CmpLoading />
    }
    else {
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
}

export default AppEvaluacionCodigo;