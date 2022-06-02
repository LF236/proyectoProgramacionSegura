import React, { useEffect, useState } from 'react';
import { Container, Box, Avatar, Typography, Grid, TextField, Autocomplete, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getAlumnosInscritos, getAlumnosNoInscritos } from '../../services/maestrosServices';
import { useSearchParams } from 'react-router-dom';
import { getInfoCurso } from '../../services/maestrosServices';
import CmpTablaAlumnosInscritos from './CmpTablaAlumnosInscritos';
import { validarUpdateCurso } from '../../helpers/Cursos/validarEntradasCursos';


const CmpEditarCurso = () => {
    const [ listaAlumnosNoInscritos, setListaAlumnosNoInscritos ] = useState( [] );
    const [ infoCursoActual, setInfoCursoActual ] = useState( {} );
    const [ form, setForm ] = useState( { nombre: '', nrc: '', descripcion: '' } );
    const [ searchParams ] = useSearchParams();
    const [ listaAlumnosInscritos, setListaAlumnosInscritos ] = useState( [] );
    useEffect(async () => {
        // Obtenemos el id del curso enviado en los query params
        const id_curso = searchParams.get( 'id_curso' );
        setForm( await getInfoCurso( id_curso ) );
        setListaAlumnosNoInscritos( await getAlumnosNoInscritos() );
        setListaAlumnosInscritos( await getAlumnosInscritos( id_curso ) );
    }, []);

    const handleInputFormChange = ( e ) => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        })
    }

    const handleUpdateCurso = ( e ) => {
        e.preventDefault();
        const listaErrores = validarUpdateCurso( form );
        console.log( listaErrores );
    }
    // Estados de las entradas de formularios
    const [ nuevaListaAlumnos, setNuevaListaAlumnos ] = useState( [] );
    const [ inputValue, setInputValue ] = useState( '' );

    return(
        <>
            <Container maxWidth='xs' component='main'>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
                    <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
                        <AddBoxIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Editar Curso
                    </Typography>

                    <Box component='form' noValidate sx={ { m: 1 } }>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 } sm={ 12 }>
                                <TextField
                                    name='nombre'
                                    id='nombre'
                                    required
                                    fullWidth                                    
                                    label='Nombre'
                                    autoComplete='given-name'
                                    variant="outlined"
                                    onChange={ handleInputFormChange }
                                    value={ form.nombre }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 }>
                                <TextField
                                    id='descripcion'
                                    required
                                    fullWidth
                                    multiline
                                    autoFocus
                                    rows={ 3 }
                                    label='Descripcion'
                                    name='descripcion'
                                    value={ form.descripcion }
                                    onChange={ handleInputFormChange }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 }>
                                <TextField
                                    fullWidth
                                    required
                                    label='NRC'
                                    name='nrc'
                                    disabled
                                    value={ form.nrc }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 }>
                                <Autocomplete 
                                    value={ nuevaListaAlumnos }
                                    onChange={ ( e, newValue ) => { 
                                        setNuevaListaAlumnos( newValue ) 
                                       
                                    } }
                                    inputValue={ inputValue }
                                    onInputChange={ ( e, newInputValue ) => {
                                        setInputValue( newInputValue );
                                    } }
                                    multiple
                                    id='alumnos'
                                    options={ listaAlumnosNoInscritos }
                                    getOptionLabel={ ( option ) => option.matricula }
                                    filterSelectedOptions
                                    fullWidth
                                    renderInput={ ( params ) => (
                                        <TextField
                                            { ...params }
                                            label='Selecciona alumnos por matricula'
                                            placeholder='Lista de Alumnos'                                        
                                        />
                                    ) }
                                />
                            </Grid>    
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={ { mt: 3, mb: 2 } }
                            color='secondary'
                            onClick={ handleUpdateCurso }
                        >
                            Actualizar Datos
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={ { m: 1 } }>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 } sm={ 12 }>
                                <CmpTablaAlumnosInscritos listaAlumnos={ listaAlumnosInscritos }/>
                            </Grid>
                        </Grid>
                        
                    </Box>
                    
                </Box>
            </Container>
        </>
    );
}

export default CmpEditarCurso;