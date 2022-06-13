import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getEjercicios, getInfoCurso } from '../../services/maestrosServices';
import { getEjerciciosCursoAlumno } from '../../services/alumnosServices';
import CmpAlumnosCursoTabla from './CmpAlumnosCursoTabla';

const CmpAlumnoInfoCurso = () => {
    const location = useLocation();
    const [ infoCurso, setInfoCurso ] = useState( [] );
    const [ listaEjercicios, setListaEjercicios ] = useState( [] );
    useEffect( async () => {
        let idCurso = location.state.id_curso;
        setInfoCurso( await getInfoCurso( idCurso ) );
        setListaEjercicios( await getEjerciciosCursoAlumno( idCurso ) );
    }, [] );

    return (
        <>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } md={ 6 } sx={ { mt: 5 } }>
                        <Typography component='h2' variant='h5'>
                            { infoCurso.nombre }
                        </Typography>
                        <Typography variant='subtitle1' color='text.secondary'>
                            NRC: { infoCurso.nrc }
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 12 }>
                        <CmpAlumnosCursoTabla listaEjercicios={ listaEjercicios }/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default CmpAlumnoInfoCurso;