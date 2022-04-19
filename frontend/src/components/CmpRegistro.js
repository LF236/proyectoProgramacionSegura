import React, { useState } from 'react';
import { CssBaseline, Grid, Paper, Box, Avatar, Typography, TextField, Button, Link, Alert, Fade, Container, Checkbox, FormControl, RadioGroup, Radio, FormLabel, FormControlLabel, PaperProps } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { validarFormularioRegistro } from '../helpers/validarEntradasFormularios';

const CmpRegistro = () => {
    const [ form, setForm ] = useState( '' );
    const [ alertError, setAlertError ] = useState( false );
    const [ mensajeError, setMensajeError ] = useState( '' );

    const handleInputFormChange = ( e ) => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        })
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        setAlertError( false );
        // Verificamos si no hay errores
        const listaErrores = validarFormularioRegistro( form );
        if( listaErrores.length == 0 ) {
            // Hacemos la peticion
            alert( 'Todo bien' );
        }
        else {
            setMensajeError( listaErrores[ 0 ] );
            setAlertError( true );
        }
    }

    return (
        <Container maxWidth='xs' component='main'>
            <Fade in={ alertError }>
                <Alert severity='error' 
                    style={ { width: "100%", position: 'fixed', left: '0', top: '0', zIndex: '10' } }
                >
                    { mensajeError }
                </Alert>
            </Fade>
            <CssBaseline />            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >                            
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <AccountCircleIcon />
                </Avatar>                
                <Typography component='h1' variant='h5'>
                    Sing Up
                </Typography>
                <Box component='form' noValidate sx={{ mt:3 }} onSubmit={ handleSubmit }>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 } sm={ 12 }>
                            <TextField
                                autoComplete='given-name'
                                name='nombre'
                                id='nombre'
                                required
                                fullWidth
                                label='Nombre'
                                autoFocus
                                onChange={ handleInputFormChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                autoComplete='given-name'
                                name='apellidoPaterno'
                                id='apellidoPaterno'
                                required
                                fullWidth
                                label='Apellido Paterno'
                                autoFocus
                                onChange={ handleInputFormChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                autoComplete='given-name'
                                name='apellidoMaterno'
                                id='apellidoMaterno'
                                required
                                fullWidth
                                label='Apellido Materno'
                                autoFocus
                                onChange={ handleInputFormChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <TextField 
                                autoComplete='matricula'
                                name='matricula'
                                id='matricula'
                                label='Matricula'
                                required
                                fullWidth
                                onChange={ handleInputFormChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <TextField 
                                autoComplete='email'
                                name='correo'
                                id='correo'
                                label='Correo Electronico'
                                required
                                fullWidth
                                onChange={ handleInputFormChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                autoComplete='nuevoPassword'
                                name='nuevoPassword'
                                id='nuevoPassword'
                                label='Contraseña'
                                required
                                fullWidth
                                type='password'
                                onChange={ handleInputFormChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                autoComplete='repitePassword'
                                name='repitePassword'
                                id='repitePassword'
                                label='Repite Contraseña'
                                required
                                fullWidth
                                type='password'
                                onChange={ handleInputFormChange }
                            />
                        </Grid>
                        
                        <Grid item xs={ 12 } sm={ 12 }>
                           <FormControl>
                               <FormLabel id="demo-controlled-radio-buttons-group">Tipo de Cuenta</FormLabel>
                               <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="tipoCuenta"
                                row
                                
                                onChange={ handleInputFormChange }
                               >
                                   <FormControlLabel value='maestro' control={ <Radio /> } label='Maestro'/>
                                   <FormControlLabel value='alumno' control={ <Radio /> } label='Alumno'/>                                   
                               </RadioGroup>
                           </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={ { mt: 3, mb: 2 } }
                    >
                        Sing In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CmpRegistro;