import React from 'react';
import { Container, Box, Avatar, Typography, Grid, TextField, Autocomplete } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import top100Films from '../../assets/data/movies';

const CmpEditarCurso = () => {
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
                                    autoFocus
                                    label='Nombre'
                                    autoComplete='given-name'
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
                                />
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 }>
                                <TextField
                                    fullWidth
                                    required
                                    label='NRC'
                                    name='nrc'
                                    disabled
                                />
                            </Grid>
                            <Autocomplete 
                                multiple
                                id='alumnos'
                                options={ top100Films }
                                getOptionLabel={ ( option ) => option.title }
                                filterSelectedOptions
                                renderInput={ ( params ) => (
                                    <TextField
                                        { ...params }
                                        
                                    />
                                ) }
                            />
                                
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default CmpEditarCurso;