import React, { useState } from 'react';
import { Container, Box, Avatar, Typography, Grid, TextField, Input, Button, Fade, Alert, AlertTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { validarCrearEjercicio } from '../../helpers/Cursos/validarEntradasCursos';
import { generarFormatoFormulario } from '../../helpers/generarFormatoFormulario';
import { guardarEjercicio } from '../../services/maestrosServices';
import { useLocation, useNavigate } from 'react-router-dom';
const CmpCrearEjercicio = ( ) => {
    const [ alertError, setAlertError ] = useState( false );
    const [ messageError, setMessageError ] = useState( '' );
    const [ suceesAlert, setSuceesAlert ] = useState( false );
    const [ form, setForm ] = useState( {} );
    const [ filesForm, setFilesForm ] = useState( {} );
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = ( e ) => {
        e.preventDefault();
        let listaErrores = validarCrearEjercicio( form, filesForm );
        if( listaErrores.length == 0 ) {
            let formEjercicio = generarFormatoFormulario( form, filesForm, location.state.id_curso );
            guardarEjercicio( formEjercicio )
            .then( res => {
                if( res.data == 'OK' ) {
                    setSuceesAlert( true );
                    setTimeout( () => {
                        setSuceesAlert( false );
                        return navigate( `/maestros/verCurso?id_curso=${ location.state.id_curso }` );
                    }, 2000 );
                }
            } )
            .catch( err => {
                setMessageError( err[ 0 ] );
                setAlertError( true );
                setTimeout( () => {
                    setAlertError( false );
                }, 2000 )
            } )
        }
        else {
            setMessageError( listaErrores[ 0 ] );
            setAlertError( true );
            setTimeout( () => {
                setAlertError( false );
            }, 2000 )
        }
        // alert( 'Enviando Datos' );
    }

    const handleInputFormChange = ( e ) => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    const handleInputFileChange = ( e ) => {
        // console.log( e.target.files[ 0 ] );
        // console.log( e.target.name )
        setFilesForm({
            ...filesForm,
            [ e.target.name ] : e.target.files[ 0 ]
        });
    }

    return (
        <Container maxWidth='sm' component='main'>
            <Fade in={ suceesAlert }>
                <Alert 
                    severity='success'
                    style={ { width: '100vw', position: 'fixed', zIndex: '10', right: 0 } }
                >
                    <AlertTitle>Ejercicio Guardado y Comprobado Correctamente</AlertTitle>
                    Seras redirigido al Curso en — <strong>2 segundos</strong>
                </Alert>
            </Fade>

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
                                onChange={ handleInputFormChange }
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
                                onChange={ handleInputFormChange }
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
                                onChange={ handleInputFormChange }
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
                                    onChange={ handleInputFileChange }
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
                                    onChange={ handleInputFileChange }
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
                                    onChange={ handleInputFileChange }
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