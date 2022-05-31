import { CssBaseline, Toolbar, Typography, Box, Container, Stack, Button, Grid, CardMedia, Card, CardContent, CardActions, Link, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { getCursosMaestros } from '../../services/maestrosServices';
import imgCurso from '../../assets/img/curso.jpg';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { formatDate } from '../../helpers/Cursos/formatDate';
const CmpMaestrosCursos = () => {
    const theme = createTheme();
    const [ cursos, setCursos ] = useState( [] );
    useEffect(() => {
        console.log( 'Actualizando cursos' );
        getCursosMaestros().then( res => {
            setCursos( res.data.listaCursos );
        } )
        .catch( () => {
            setCursos( [] );
        } )
    }, []);

    
    return (
        <>
            <ThemeProvider theme={ theme }>
                <CssBaseline />
                <section>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 2,
                            pb: 6
                        }}
                    >
                        <Container maxWidth='sm'>
                            <Typography
                                component='h1'
                                variant='h2'
                                aling='center'
                                color='text.primary'
                                gutterBottom
                            >
                                Mis cursos
                            </Typography>
                            

                            <Stack
                                sx={ { pt: 2 } }
                                direction='row'
                                spacing={ 2 }
                                justifyContent='start'
                            >
                                <Button variant='contained'>
                                    <Link href='/maestros/crearCurso' color='inherit' underline='none'>Agregar Curso</Link>
                                </Button>
                                <Button variant='outlined'>Editar Curso</Button>
                            </Stack>
                        </Container>
                    </Box>
                    { cursos.length == 0 &&
                        <Container sx={ { py: 1 } } maxWidth='md'>
                            <Grid container justifyContent='flex-start' alignItems='center'>
                                <Avatar sx={ { m: 1, bgcolor: 'warning.main' } }>
                                    <SentimentVeryDissatisfiedIcon />
                                </Avatar>
                                
                                <Typography variant='subtitle1'>
                                    No tienes cursos registrados, agrega uno.
                                </Typography>
                            </Grid>
                        </Container>
                        
                    }
                    <Container sx={ { py: 1 } } maxWidth='md'>
                        <Grid container spacing={ 4 }>
                            { cursos.map( curso => (
                                <Grid
                                    item
                                    key={ curso }
                                    xs={ 21 }
                                    sm={ 6 }
                                    md={ 4 }
                                >
                                    <Card
                                        sx={ { height: '100%', display: 'flex', flexDirection: 'column' } }
                                    >
                                        <CardMedia 
                                            component='img'
                                            sx={{
                                                
                                            }}
                                            image={ imgCurso }
                                            alt={ curso }
                                        />
                                        <CardContent sx={ { flexGrow: 1 } }>
                                            <Typography gutterBottom variant='h5' component='h2'>
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
                                            <Button size='small'>Ver</Button>
                                            <Button size='small'><Link underline='none' href={ `maestros/editarCurso?id_curso=${ curso.id }` }>Editar</Link></Button>
                                        </CardActions>                
                                    </Card>                                    
                                </Grid>
                            ) ) }
                        </Grid>
                    </Container>
                </section>
            </ThemeProvider>
        </>
    );
}

export default CmpMaestrosCursos;