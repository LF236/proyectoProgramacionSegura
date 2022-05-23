import { CssBaseline, Toolbar, Typography, Box, Container, Stack, Button, Grid, CardMedia, Card, CardContent, CardActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { getCursosMaestros } from '../../services/maestrosServices';

const CmpMaestrosCursos = () => {
    const theme = createTheme();
    const cursos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const test = () => {
        getCursosMaestros().then( res => {
            console.log( res );
        } )
        
    }

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
                                <Button variant='contained'>Agregar Curso</Button>
                                <Button variant='outlined' onClick={ test }>Editar Curso</Button>
                            </Stack>
                        </Container>
                    </Box>

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
                                            image='https://source.unsplash.com/random'
                                            alt={ curso }
                                        />
                                        <CardContent sx={ { flexGrow: 1 } }>
                                            <Typography gutterBottom variant='h5' component='h2'>
                                                Heading
                                            </Typography>
                                            
                                            <Typography>
                                                Created at: 10/05/22
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size='small'>Ver</Button>
                                            <Button size='small'>Edit</Button>
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