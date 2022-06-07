import { CardActionArea, Container, CssBaseline, Grid, Stack, Typography, Button, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getInfoCurso } from '../../services/maestrosServices';

const CmpInfoCurso = () => {
    const [ searchParams ] = useSearchParams();
    const [ infoCurso, setInfoCurso ] = useState( '' );
    useEffect( async () => {
        const id_curso = searchParams.get( 'id_curso' );
        setInfoCurso( await getInfoCurso( id_curso ) );
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
                                <Link href='/maestros/crearEjercicio' color='inherit' underline='none'>Crear Ejercicio</Link>
                            </Button>

                            <Button variant='outlined' color='error'>Eliminar Ejercicio</Button>
                        </Stack>
                    </Grid>
                        
                </Grid>
            </Container>
        </>
    );
}

export default CmpInfoCurso;