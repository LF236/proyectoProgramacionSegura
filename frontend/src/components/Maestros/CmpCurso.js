import { Container, Typography, Box, Stack, Button, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import React from 'react';
const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'create_at', label: 'Fecha de Creación', minWidth: 170 },
    { id: 'acciones', label: 'Acciones' }
];

const CmpCurso = () => {
    return (
        <Container component='main'>

            <Box
                sx={{
                    pt: 2,
                    pb: 6
                }}
            >
                <Container>
                    <Typography className='curso-component-title' variant='h4' component='h1'>
                        Progamación Segura
                    </Typography>
                    <Typography variant='caption'>
                        NRC: 233213
                    </Typography>
                    <Typography sx={ { pt: 2 } } >
                        Dolor qui aliquip id labore sit cupidatat. Non ea exercitation Lorem amet nisi exercitation eiusmod in ullamco do labore. Qui culpa eu irure dolor sint sunt quis ea duis. Dolore laborum qui incididunt duis Lorem proident. Quis incididunt qui occaecat anim. Irure officia labore cillum reprehenderit. Ipsum ex officia ad culpa sunt velit elit aliqua.
                    </Typography>
                    <Stack
                        sx={{ pt: 2 }}
                        direction='row'
                        spacing={2}
                    >
                        <Button variant='contained'>
                            Nuevo Ejercicio
                        </Button>

                    </Stack>
                </Container>
            </Box>

            <Box
                sx={{
                    pt: 2,
                    pb: 6
                }}
            >
                <Container>
                    {/* Table */}
                    <TableContainer sx={ { maxHeight: 440 } }>
                        <TableHead>
                            <TableRow>
                                { columns.map( column => (
                                    <TableCell
                                        key={ column.id }
                                        aling={ column.aling }
                                        style={ { minWidth: column.minWidth } }
                                    >
                                        { column.label }
                                    </TableCell>
                                ) ) }
                            </TableRow>
                        </TableHead>
                    </TableContainer>
                </Container>
            </Box>
        </Container>
    );
}

export default CmpCurso;