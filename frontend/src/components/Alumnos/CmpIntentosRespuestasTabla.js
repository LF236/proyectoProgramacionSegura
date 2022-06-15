import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography, Button, TableHead } from '@mui/material';
import { Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const CmpIntentosRespuestasTabla = ({ listaIntentos }) => {

    const estado = calificacion => {
        if( parseInt( calificacion ) >= 7 ) {
            return ( <Button variant='contained' sx={{ background: 'green' }} startIcon={ <CheckCircleIcon /> }>Aprobado</Button> );            
        } else {
            return ( <Button variant='contained' sx={{ background: 'red' }} startIcon={ <HighlightOffIcon /> }>Reprobado</Button> );
        }
    }
    return (
        <>
            <TableContainer component={ Paper } sx={{ mt: 5, userSelect: 'none' }}>
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
                        Mi Lista de Intentos
                    </Typography>
                </Toolbar>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Calificación</TableCell>
                            <TableCell>Fecha Intento</TableCell>
                            <TableCell>Estado</TableCell>                     
                        </TableRow>                        
                    </TableHead>

                    <TableBody>
                        { listaIntentos.map( intento => (
                            <TableRow
                                key={ Math.random() }
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell  scope='row'>
                                    { intento[ 'RespuestaAlumno.resultado' ] }
                                </TableCell>
                                <TableCell scope='row'>
                                    { new Date( intento[ 'RespuestaAlumno.createdAt' ] ).toLocaleString() }
                                </TableCell>
                                <TableCell scope='row'>
                                    { estado( intento[ 'RespuestaAlumno.resultado' ] ) }
                                </TableCell>
                            </TableRow>
                        ) ) }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CmpIntentosRespuestasTabla;