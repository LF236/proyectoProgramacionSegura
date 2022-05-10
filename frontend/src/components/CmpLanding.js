import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { Navigate } from 'react-router-dom';
import { Grid, Paper, Box, Typography, Button, Link } from '@mui/material';
import imgLogo from '../assets/img/demo.jpg'
const CmpLanding = () => {
    const { user } = useContext( UserContext );
    // Si el usuario existe en el contexto redirigimos al home
    if( user ) {
        return <Navigate to='/home/' />
    }

    return (
        <div className='landing_page'>
            <Grid container component='main'>
                
                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                    <Box
                        sx={{
                            my: 20,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alingItems: 'center'
                        }}
                    >
                        <Typography component='h1' variant='h5' className='name_app'>
                            Evaluador de COdigo FEI 
                        </Typography>
                        <p className='content_app'>
                            Página oficial de la Facultad de Estadistica e Informática que permite evaluar código <small>Bash</small> y proximamente más lenguajes.
                        </p>
                        <div className='buttons'>
                            <Button variant="contained" size="large">
                                <Link href="/login" underline="none" color='inherit'>
                                    Iniciar Sesión
                                </Link>                                
                            </Button>

                            <Button variant="outlined" size="large">
                                <Link href='/registro' underline='none' color='inherit'>
                                    Registro                                                                    
                                </Link>                                
                            </Button>
                        </div>
                    </Box>

                    
                </Grid>
                <Grid item xs={ false } sm={ 4 } md={ 7 }
                    sx={{
                        backgroundImage: `url( ${ imgLogo } )`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: t =>
                            t.palette.mode === 'light' ? t.palette.grey[ 50 ] : t.palette.grey[ 900 ]
                    }}
                >
                </Grid>
                
            </Grid>
        </div>
    );
}

export default CmpLanding;