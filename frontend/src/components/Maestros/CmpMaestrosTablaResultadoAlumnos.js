import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography, Button, TableHead } from '@mui/material';
import { Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';

const CmpMaestrosTablaResultadoAlumnos = ({ allRespuestas }) => {
    return (
        <>
            <TableContainer component={ Paper } sx={ { mt: 4, userSelect: 'none' } }>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                    
                    }}                        
                >
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant='h6'
                        component='div'
                        id='tableTitle'
                    >
                        Respuestas de Alumnos
                    </Typography>
                </Toolbar>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre Alumno</TableCell>
                            <TableCell>Matricula</TableCell>
                            <TableCell>Calificacion</TableCell>
                            <TableCell>Fecha de Intento</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { allRespuestas.map( respuesta => (
                            <TableRow
                                key={ Math.random() }
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}                        
                            >
                                <TableCell scope='row'>
                                    { `${ respuesta.infoUsuario.nombre } ${ respuesta.infoUsuario.apellidoPaterno } ${ respuesta.infoUsuario.apellidoMaterno }` }
                                </TableCell>
                                <TableCell scope='row'>
                                    { respuesta.infoUsuario.matricula }
                                </TableCell>
                                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                    { respuesta.resultado }
                                </TableCell>
                                <TableCell scope='row'>
                                    { new Date( respuesta.createdAt ).toLocaleString() }
                                </TableCell>
                            </TableRow>
                        ) ) }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CmpMaestrosTablaResultadoAlumnos;