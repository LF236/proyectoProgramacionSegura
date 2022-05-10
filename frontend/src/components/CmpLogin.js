import React, { useState, useContext } from 'react';
import { CssBaseline, Grid, Paper, Box, Avatar, Typography, TextField, Button, Link, Alert, Fade } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import imgLogo from '../assets/img/loginP.jpg'
import { validarFormularioLogin } from '../helpers/validarEntradasFormularios';
import { sendLoginData } from '../services/authServices';
import { UserContext } from '../hooks/UserContext';
import CmpLoading from './CmpLoading';
const LoginComponent = () => {
    const [ inputForm, setInputForm ] = useState( '' );
    const [ alertError, setAlertError ] = useState( false );
    const { user, isLoading } = useContext( UserContext );
    const handleInputFormChange = ( e ) => {
        setInputForm({
            ...inputForm,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();
        // Si hay un error al procesar el formulario se activa la alerta
        if( !validarFormularioLogin( inputForm ) ) {
            setAlertError( true );
            return;
        }
        else {
            // Autenticacion SI O NO, con los tokens 
            // Si el formulario pasa las validaciones se envia la data al backend
            setAlertError( false );
            sendLoginData( inputForm )
                .then( res => {
                    const { auth, jwtToken } = res.data;
                    if( !auth ) {
                        setAlertError( true );
                        return;
                    }
                    else if ( auth ) {
                        // Alcamenar el JwtToken en el localStorage
                        localStorage.setItem( 'userInfo', jwtToken );
                        // Redirigimos a la la página de inicio
                        return window.location = '/';
                    }
                    
                } )
        }
    }
    // Info about Copyring of the system
    const Copyright = (props) => {
        return(           
            <Typography variant='body2' color='text.secondary' align='center' >
                { 'Copyright © ' }
                <Link color='inherit' href='https://uv.mx/fei' target='_blank'>
                    Facultad de Estadistica e Informática
                </Link>{ ' ' }
                { new Date().getFullYear() }
                { ' ' }
            </Typography>           
        );
    }

    // Verificamos que el hook no este cargando NADA con la propiedad 'isLoading'
    if( isLoading ) {
        return <CmpLoading />
    }

    // Verificamos si hay una sesión activa, si lo es redirigimos al home
    if( user ) {
        return window.location = '/home';
    }
    
    return (
        <>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                    {/* Alerta de error */}
                    {alertError &&
                        <Fade in={ alertError }>
                            <Alert severity='error'>Correo o contraseña incorrecta</Alert>
                        </Fade>
                    }

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
                        </Box>    
                    </Box>
                    <Copyright sx={ { mt: 5 } }/>
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
        </>
    );
    
}

export default LoginComponent;