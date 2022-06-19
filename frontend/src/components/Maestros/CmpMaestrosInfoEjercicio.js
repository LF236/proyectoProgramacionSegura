import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getInfoEjercicio } from '../../services/alumnosServices';
import { getAllRespuestas } from '../../services/maestrosServices';
import CmpMaestrosTablaResultadoAlumnos from './CmpMaestrosTablaResultadoAlumnos';

const CmpMaestrosInfoEjercicio = () => {
    const [ infoEjercicio, setInfoEjercicio ] = useState( [] );
    const [ allRespuestas, setAllRespuestas ] = useState( [] );
    const location = useLocation();
    useEffect( async () => {
        let id_ejercicio = location.state.id_ejercicio;
        setInfoEjercicio( await getInfoEjercicio( id_ejercicio ) );
        setAllRespuestas( await getAllRespuestas( id_ejercicio ) )
        
    }, [] );

    return (
        <>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 5 }}>
                    <Typography component='h2' variant='h5'>
                            { infoEjercicio.nombre }
                        </Typography>                       
                        
                        <Typography variant='subtitle1' color='text.secondary'>
                            Descripcion: { infoEjercicio.descripcion }
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 12 }>
                        <CmpMaestrosTablaResultadoAlumnos allRespuestas={ allRespuestas }/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default CmpMaestrosInfoEjercicio;