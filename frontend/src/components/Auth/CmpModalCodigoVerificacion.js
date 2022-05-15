import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Backdrop, Fade, TextField, Button, Alert } from '@mui/material';
// import { Box } from '@mui/system';
import React from 'react';
import { validarCodigoVerificacionRegistro } from '../../helpers/validarEntradasFormularios';

const style = {
    modalContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate( -50%, -50% )',
        width: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    },
    modalVerificationBottom: {
        bgcolor: '#111',
        
    }
};

const CmpModalCodigoVerificacion = ({ bandShowModal, setOpenModal, dataRegistroTemporal }) => {
    const [ open, setOpen ] = useState( false );
    const [ inputForm, setInputForm ] = useState( '' );
    const [ alertError, setAlertError ] = useState( false );
    const [ mensajeError, setMensajeError ] = useState( '' );

    useEffect(() => {
        setOpen( bandShowModal );
    }, [ bandShowModal ]);

    const handleSubmit = ( e ) => {
        e.preventDefault();
        const listaErrores = validarCodigoVerificacionRegistro( inputForm );
        if( listaErrores.length == 0 ) {
            // Si no hay los errores mandamos los datos al endPoint
            console.log( 'TODO OK' );
        }
        else {
            setMensajeError( listaErrores[ 0 ] );
            setAlertError( true );
            setTimeout(() => {
                setAlertError( false );
            }, 2000);
        }
    }

    const handleInputFormChange = ( e ) => {
        setInputForm({
            ...inputForm,
            [ e.target.name ] : e.target.value
        })
    }

    const handleModalClose = () => {
        setOpen( false );
        setOpenModal( false );
    };

    return (
        <>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={ open }
                closeAfterTransition
                BackdropComponent={ Backdrop }
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={ open }>
                    
                    <Box sx={ style.modalContent }>
                        <Fade in={ alertError }>
                            <Alert severity='error' 
                                style={ { width: "100%", position: 'absolute', left: '0', top: '0', zIndex: '10', userSelect: 'none' } }
                            >
                                { mensajeError }
                            </Alert>
                        </Fade>
                        <Typography id='transition-modal-title' variant='h6' component='h2'>
                            Ingresa el código de verificación
                        </Typography>                       
                        <Box id='transition-modal-description' component='form' noValidate sx={ { mt: 1 } } onSubmit={ handleSubmit }>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='codigoVerificacion'
                                label='Código de Verificación'
                                name='codigoVerificacion'
                                autoComplete='codigoVerificacion'
                                autoFocus
                                inputProps={ { maxLength: 4 } }
                                onChange={ handleInputFormChange }
                            />

                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={ { mt: 3, mb: 2 } }
                            >
                                Registrar
                            </Button>
                        </Box>                            
                       
                        <Typography id='transition-modal-description' sx={ { mt: 2 } }>
                            <small sx={ style.modalVerificationBottom }>No actualices o recargues la página ya que tendrás volver a hacer el proceso</small>
                        </Typography>

                        <Button onClick={ handleModalClose }>Cerrar</Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

CmpModalCodigoVerificacion.propTypes = {
    bandShowModal: PropTypes.bool.isRequired
}

CmpModalCodigoVerificacion.defaultProps = {
    bandShowModal: false
}

export default CmpModalCodigoVerificacion;