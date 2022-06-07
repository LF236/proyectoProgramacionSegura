import React, { useState } from 'react';
import { Container, Box, Avatar, Typography, Grid, TextField, Input, Button, Fade, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { validarCrearEjercicio } from '../../helpers/Cursos/validarEntradasCursos';
const CmpCrearEjercicio = () => {
    const [ alertError, setAlertError ] = useState( false );
    const [ messageError, setMessageError ] = useState( '' );
    const [ form, setForm ] = useState( {} );
    const handleSubmit = ( e ) => {
        e.preventDefault();
        validarCrearEjercicio( form );
        // alert( 'Enviando Datos' );
    }

    const handleInputFormChange = ( e ) => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    return (
        <Container maxWidth='sm' component='main'>
            <Fade in={ alertError }>
                <Alert
                    severity='error'
                    style={{ width: '100%', position: 'fixed', left: '0', top: '64px', zIndex: '10' }}
                >
                    { messageError }
                </Alert>
            </Fade>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    m: 10
                }}
            >
                <Avatar sx={ { m: 1, bgcolor: 'primary.main' } }>
                    <AddIcon />
                </Avatar>
                <Typography componen='h1' variant='h5'>
                    Crear Ejercicio
                </Typography>

                <Box component='form' noValidate sx={ { mt: 1 } }>
                    <Grid container spacing={ 2 } >
                        <Grid item xs={ 12 } sm={ 12 }>
                            <TextField
                                name='nombre'
                                id='nombre'
                                required
                                fullWidth
                                label='Nombre'
                                autoFocus
                                autoComplete='given-name'
                                onChange={ handleInputFormChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <TextField
                                id='descripcion'
                                name='descripcion'
                                required
                                fullWidth
                                multiline
                                rows={ 3 }
                                label='Descripcion'
                                name='descripcion'
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <TextField
                                id='entradas_prueba'
                                name='entradas_prueba'
                                required
                                fullWidth
                                label='Entradas de Prueba'
                                helperText='EJ: 1,2,3,4'
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <TextField
                                id='salidas_esperadas'
                                name='salidas_esperadas'
                                required
                                fullWidth
                                label='Salidas Esperadas'
                                helperText='EJ: 1,2,3'
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <label htmlFor='script_inicializacion'>
                                <Input
                                    id='script_inicializacion'
                                    name='script_inicializacion'
                                    type='file'
                                    sx={{
                                        display: 'none'
                                    }}
                                />
                                <Button variant='outlined' component='span' fullWidth startIcon={ <UploadFileIcon /> }>
                                    Script de Inicialización
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <label htmlFor='script_comprobacion_parametros'>
                                <Input
                                    id='script_comprobacion_parametros'
                                    name='script_comprobacion_parametros'
                                    type='file'
                                    sx={{
                                        display: 'none'
                                    }}
                                />
                                <Button variant='outlined' component='span' fullWidth startIcon={ <UploadFileIcon /> }>
                                    Script de Comprobación de Parámetros
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <label htmlFor='script_comprobacion_final'>
                                <Input
                                    id='script_comprobacion_final'
                                    name='script_comprobacion_final'
                                    type='file'
                                    sx={{
                                        display: 'none'
                                    }}
                                />
                                <Button variant='outlined' component='span' fullWidth startIcon={ <UploadFileIcon /> }>
                                    Script de Comprobación del Estado Final
                                </Button>
                            </label>
                        </Grid>
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={ { mt: 3, mb: 2 } }
                        onClick={ handleSubmit }
                    >
                        Guardar Ejercicio
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CmpCrearEjercicio;