import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Grid, Avatar } from '@mui/material';
import { Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const CmpTablaAlumnosInscritos = ({ listaAlumnos }) => {
    useEffect(() => {
        console.log( listaAlumnos );
        console.log( listaAlumnos.length );
        if( listaAlumnos.length == 0 ) {
            alert( 'NO HAY NADIE' );
        }
    }, [])
    const rowsExample = [
        { name: 'Frozen yoghurt', matricula: 'S18014081' },
        { name: 'Frozen yoghurt', matricula: 'S18014082' },
        { name: 'Frozen yoghurt', matricula: 'S18014083' },
        { name: 'Frozen yoghurt', matricula: 'S18014084' },
        { name: 'Frozen yoghurt', matricula: 'S18014085' },
        { name: 'Frozen yoghurt', matricula: 'S18014086' },

    ];

    return (
        <>
            {listaAlumnos.length == 0 &&
                <Container sx={{ py: 1 }} maxWidth='md'>
                    <Grid container justifyContent='flex-start' alignItems='center'>
                        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
                            <SentimentVeryDissatisfiedIcon />
                        </Avatar>

                        <Typography variant='subtitle1'>
                            NO hay alumnos registrados en este curso
                        </Typography>
                    </Grid>
                </Container>
            }
            <TableContainer component={Paper}>
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
                        id="tableTitle"
                    >
                        Lista de Alumnos Inscritos
                    </Typography>
                </Toolbar>
                <Table sx={{ minWidth: 375 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Matricula</TableCell>
                            <TableCell>Nombre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsExample.map(row => (
                            <TableRow
                                key={row.matricula}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    {row.matricula}
                                </TableCell>
                                <TableCell aling='right'>{row.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

PropTypes.propTypes = {
    listaAlumnos: PropTypes.array.isRequired
}
export default CmpTablaAlumnosInscritos;