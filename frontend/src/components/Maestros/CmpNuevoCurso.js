import React, { useState } from 'react';
import { Container, Box, Avatar, Typography, Grid, TextField, Button, Fade, Alert } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { nfcRandom } from '../../helpers/Cursos/nfcRandom';
import { validarCrearNuevoCurso } from '../../helpers/Cursos/validarEntradasCursos';

const CmpNuevoCurso = () => {
    const [ form, setForm ] = useState( [] );
    const [ nfc, setNfc ] = useState( '' );
    const [ alertError, setAlertError ] = useState( false );
    const [ mensajeError, setMensajeError ] = useState( '' );

    const handleGenerarNFC = () => {
        const msg = nfcRandom();
        // Seteamos el valor dentro del input
        setNfc( msg );
        // Lo seteamos al estado del formulario
        setForm( {
            ...form,
            [ 'nfc' ]: msg
        } );
        
    }

    const handleInputFormChange = ( e ) => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    const onSubmit = ( e ) => {
        e.preventDefault();
        let erroresForm = validarCrearNuevoCurso( form );
        if( erroresForm.length == 0 ) {
            alert( 'NO HAY ERROR' );
        } else {
            setMensajeError( erroresForm[ 0 ] );
            setAlertError( true );
            setTimeout(() => {
                setAlertError( false );
            }, 2000)
        }
    }

    return (
        <Container maxWidth='xs' component='main'>
            <Fade in={ alertError }>
                <Alert severity='error' 
                    style={ { width: "100%", position: 'fixed', left: '0', top: '64px', zIndex: '10' } }
                >
                    { mensajeError }
                </Alert>
            </Fade>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={ { m: 1, bgcolor: 'primary.main' } }>
                    <AddBoxIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Agregar Nuevo Curso
                </Typography>

                <Box component='form' noValidate sx={ { mt:1 } }>
                    <Grid container spacing={ 2 }>
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
                                id='nrc'
                                required
                                fullWidth
                                label='NRC'
                                name='nrc'
                                disabled
                                value={ nfc }
                                
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 }>
                            <Button
                                fullWidth
                                variant='contained'
                                color='secondary'
                                onClick={ handleGenerarNFC }
                            >
                                Generar NFC
                            </Button>
                        </Grid>
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={ { mt: 3, mb: 2 } }
                        onClick={ onSubmit }
                    >
                        Guardar Curso
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CmpNuevoCurso;