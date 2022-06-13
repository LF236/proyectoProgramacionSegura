import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getMisCurso } from '../../services/alumnosServices';
import imgCurso from '../../assets/img/curso.jpg';
import { formatDate } from '../../helpers/Cursos/formatDate';

const CmpAlumnosCursos = () => {
    const theme = createTheme();

    const [ misCursos, setMisCursos ] = useState( [] );

    useEffect( async () => {
        setMisCursos( await getMisCurso() );
    }, [] )
    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline />
            <section>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 2,
                        pb: 1
                    }}
                >
                    <Container maxWidth='sm'>
                        <Typography
                            component='h1'
                            variant='h5'
                            aling='center'
                            gutterBottom
                        >
                            Cursos Inscritos
                        </Typography>
                    </Container>
                </Box>

                <Container sx={ { py: 1 } } maxWidth='md'>
                    <Grid container spacing={ 4 }>
                        { misCursos.map( curso => (
                            <Grid
                                item
                                key={ curso.id }
                                xs={ 21 }
                                sm={ 5 }
                                md={ 4 }
                            >
                                <Card
                                    sx={ { height: '100%', display: 'flex', flexDirection: 'column' } }
                                >
                                    <CardMedia
                                        component='img'
                                        image={ imgCurso }
                                        alt={ curso.nombre }
                                    />

                                    <CardContent sx={ { flexGrow: 1 } }>
                                        <Typography gutterBottom variant='h6' component='h2'>
                                            { curso.nombre }
                                        </Typography>

                                        <Typography>
                                                Fecha de creación: { formatDate( curso.createdAt ) }
                                        </Typography>
                                        <Typography variant='caption'>
                                            NRC: { curso.nrc }
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button size='small' variant='contained'>
                                            <Link 
                                                to='/alumnos/verCurso' 
                                                style={{ color: 'white', textDecoration: 'none' }}
                                                state={ { id_curso: curso.id } }
                                            >
                                                Ver
                                            </Link>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ) ) }
                    </Grid>
                </Container>
            </section>
        </ThemeProvider>
    );
}

export default CmpAlumnosCursos;