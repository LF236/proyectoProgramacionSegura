import { CardActionArea, Container, CssBaseline, Grid, Stack, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getEjercicios, getInfoCurso } from '../../services/maestrosServices';
import CmpTablaEjercicios from './CmpTablaEjercicios';

const CmpInfoCurso = () => {
    const [ searchParams ] = useSearchParams();
    const [ infoCurso, setInfoCurso ] = useState( '' );
    const [ listaEjercicios, setListaEjercicios ] = useState( [] );
    useEffect( async () => {
        const id_curso = searchParams.get( 'id_curso' );
        setInfoCurso( await getInfoCurso( id_curso ) );
        setListaEjercicios( await getEjercicios( id_curso ) );
    }, [] );
    return (
        <>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Grid container spacing={ 4 } >
                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 5 }}>
                        <Typography component='h2' variant='h5'>
                            { infoCurso.nombre }
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            NRC: { infoCurso.nrc }
                        </Typography>
                    </Grid>
                    <Grid item xs={ 12 } md={ 12 }>
                        <Stack
                            direction='row'
                            spacing={ 2 }
                            justifyContent='start'
                        >
                            <Button variant='contained'>
                                <Link to='/maestros/crearEjercicio' state={ { id_curso: searchParams.get( 'id_curso' ) } } style={{ color: 'white', textDecoration: 'none' }}>
                                    Crear Ejercicio
                                </Link>
                            </Button>                            
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={ 4 }>
                    <Grid item xs={12} sm={12}>
                        <CmpTablaEjercicios listaEjercicios={ listaEjercicios }/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default CmpInfoCurso;