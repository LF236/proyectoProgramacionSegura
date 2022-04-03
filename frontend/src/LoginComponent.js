import React, { useState } from 'react';
import { CssBaseline, Grid, Paper, Box, Avatar, Typography, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import imgLogo from './assets/img/loginP.jpg'
import { validarFormularioLogin } from './helpers/validarEntradasFormularios';
const LoginComponent = () => {
    const [ inputForm, setInputForm ] = useState( '' );

    const handleInputFormChange = ( e ) => {
        setInputForm({
            ...inputForm,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();
        const errores = validarFormularioLogin( inputForm );
        console.log( errores );
    }
    // Info about Copyring of the system
    const infoCopyright = () => {
        return(
            <>
                <Typography variant='body2' color='text.secondary' aling='center' sx={ { mt: 5 } }>
                    { 'Copyright © ' }
                    <Link color='inherit' href='https://uv.mx/fei' target='_blank'>
                        Facultad de Estadistica e Informática
                    </Link>{ ' ' }
                    { new Date().getFullYear() }
                    { ' ' }
                </Typography>
            </>
        );
    }

    return (
        <>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />
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

                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={ { m: 1, bgcolor: 'primary.main' } }>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Login
                        </Typography>
                        <Box component='form' noValidate sx={ { mt: 1 } } onSubmit={ handleSubmit }>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Dirección de Correo'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                onChange={ handleInputFormChange }
                            />

                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Contraseña'
                                type='password'
                                id='password'
                                autoComplete='currentPassword'
                                onChange={ handleInputFormChange }
                            />

                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={ { mt: 3, mb: 2 } }
                            >
                                Sing In
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link variant='body2' href='#'>
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </Grid>

                                <Grid item>
                                    <Link variant='body2' href='#'>
                                        { '¿No tienes una cuenta? Registrate' }
                                    </Link>
                                </Grid>
                            </Grid>
                            { infoCopyright() }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default LoginComponent;