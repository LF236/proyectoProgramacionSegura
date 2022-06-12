import React from 'react';
import { TableContainer, Toolbar, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const CmpTablaEjercicios = ({ listaEjercicios }) => {
    console.log( listaEjercicios );
    return (
        <>
            <TableContainer component={ Paper } sx={{ mt: 5 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                    }}
                >
                    <Typography
                        sx={ { flex: '1 1 100%' } }
                        variant='h6'
                        component='div'
                        id='tableTitle'
                    >
                        Lista de Ejercicios
                    </Typography>
                </Toolbar>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha de Creación</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { listaEjercicios.map( ejercicio => (
                            <TableRow
                                key={ ejercicio }
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    { ejercicio.nombre }
                                </TableCell>
                                <TableCell aling='right'>{ new Date( ejercicio.createdAt ).toDateString() }</TableCell>
                                <TableCell>
                                    <Button variant='contained' startIcon={ <RemoveRedEyeIcon /> }>Ver</Button>
                                </TableCell>
                            </TableRow>
                        ) ) }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CmpTablaEjercicios;