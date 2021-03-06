import { Button, Container, CssBaseline, Grid, Stack, Typography, Modal, Fade, Box, Backdrop, Alert, AlertTitle ,Input, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getEjerciciosMisRespuestas, getInfoEjercicio, subirIntentoEjercicio } from '../../services/alumnosServices';
import { styleModalIntento } from '../../themes/styleModalInteto';
import CmpIntentosRespuestasTabla from './CmpIntentosRespuestasTabla';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { green } from '@mui/material/colors';
import { validarEntradasIntento } from '../../helpers/Cursos/validarEntradasCursos';

const CmpAlumoInfoEjercicio = () => {
    const [ alertError, setAlertError ] = useState( false );
    const [ messageError, setMessageError ] = useState( '' );
    const [ listaIntentos, setListaIntentos ] = useState( [ { nombre: '', descripcion: '', entradas_prueba: [ 1 ], entradas_salida: [ 1 ] } ] );
    const [ openModalIntento, setOpenModalIntento ] = useState( false );
    const [ loading, setLoading ] = useState( false );
    const [ success, setSuccess ] = useState( false );
    const [ filesForm, setFilesForm ] = useState( {} );
    const [ infoEjercicio, setInfoEjercicio ] = useState( {} );
    const [ suceesAlert, setSuceesAlert ] = useState( false );
    const handleOpenModalIntento = () => setOpenModalIntento( true );
    const handleCloseModalIntento = () => setOpenModalIntento( false );
    const location = useLocation();
    useEffect( async () => {
        let id_ejercicio = location.state.id_ejercicio;
        setListaIntentos( await getEjerciciosMisRespuestas( id_ejercicio ) );
        setInfoEjercicio( await getInfoEjercicio( id_ejercicio ) );
    }, [] )
    
    const handleInputFileChange = ( e ) => {
        // console.log( e.target.files[ 0 ] );
        // console.log( e.target.name )
        setFilesForm({
            ...filesForm,
            [ e.target.name ] : e.target.files[ 0 ]
        });
    }

    const handleSubmitIntento = () => {
        // Primero se validan las entradas
        let errores = validarEntradasIntento( filesForm );
        setSuccess(false);
        setLoading(true);
        if( errores.length == 0 ) {
            subirIntentoEjercicio( location.state.id_ejercicio, filesForm )
            .then( res => {
                if( res.data == 'OK' ) {
                    setSuccess(true);
                    setLoading(false);
                    setSuceesAlert( true );
                    setTimeout( () => {
                        setSuceesAlert( false );
                        window.location.reload();
                    }, 2000 )
                }                
            } )
            .catch( err => {
                console.log( err );
                setMessageError( 'Error en el servidor' );
                setAlertError( true );
                setTimeout( () => {
                    setAlertError( false );
                    setSuccess(false);
                    setLoading(false);
                }, 2000 )
            } )
        } else {
            setMessageError( errores[ 0 ] );
            setAlertError( true );
            setTimeout( () => {
                setAlertError( false );
                setSuccess(false);
                setLoading(false);
            }, 2000 )
        }
    }

    const entradasToJson = entrada => {
        return JSON.parse( entrada );
    }

    const buttonSx = {
        
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
            bgcolor: green[700],
            },

        }),
    };
    return (
        <>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Fade in={ suceesAlert }>
                    <Alert 
                        severity='success'
                        style={ { width: '100vw', position: 'fixed', zIndex: '1000000', right: 0 } }
                    >
                        <AlertTitle>Ejercicio Calificado</AlertTitle>
                        La info se va a actualizar en ??? <strong>2 segundos</strong>
                    </Alert>
                </Fade>
                <Fade in={ alertError }>
                    <Alert
                        severity='error'
                        style={{ width: '100%', position: 'fixed', left: '0', top: '64px', zIndex: '10000' }}
                    >
                        { messageError }
                    </Alert>
                </Fade>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    open={ openModalIntento }
                    onClose={ handleCloseModalIntento }
                    closeAfterTransition
                    BackdropComponent={ Backdrop }
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Fade in={ openModalIntento } >
                        <Box sx={ styleModalIntento } >
                            <Typography variant='h6' component='h2'>
                                Selecciona tu archivo SH
                            </Typography>

                            <Box component='form' sx={{ mt: 2 }}>
                                <Grid item xs={ 12 } sm={ 12 }>
                                    <label htmlFor='script_intento'>
                                        <Input 
                                            id='script_intento'
                                            name='script_intento'
                                            type='file'
                                            sx={{
                                                display: 'none'
                                            }}
                                            onChange={ handleInputFileChange }
                                        />
                                        <Button variant='outlined' component='span' fullWidth startIcon={ <AttachFileIcon /> }>
                                            Agregar Script
                                        </Button>
                                    </label>
                                </Grid>
                                
                                <Grid sx={ { position: 'relative', mt: 2 } }>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={ buttonSx }
                                        disabled={ loading }
                                        onClick={ handleSubmitIntento }
                                    >
                                        Responder ejercicio
                                    </Button>

                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Grid>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 5 }}>
                        <Typography component='h2' variant='h5'>
                            { infoEjercicio.nombre }
                        </Typography>                       
                        
                        <Typography variant='subtitle1' color='text.secondary'>
                            Descripcion: { infoEjercicio.descripcion }
                        </Typography>

                    </Grid>
                </Grid>
                <Grid item xs={ 12 } md={ 12 }>
                    <Stack
                        direction='row'
                        spacing={ 2 }
                        justifyContent='start'
                        sx={{ mt: 2 }}
                    >
                        <Button variant='contained' onClick={ handleOpenModalIntento }>
                            Intentar
                        </Button>
                    </Stack>
                </Grid>
                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 12 }>
                        <CmpIntentosRespuestasTabla listaIntentos={ listaIntentos }/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default CmpAlumoInfoEjercicio;