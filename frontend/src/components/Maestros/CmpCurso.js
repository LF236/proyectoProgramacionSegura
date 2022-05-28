import { Container, Typography, Box, Stack, Button } from '@mui/material';
import React from 'react';

const CmpCurso = () => {
    return (
        <Container component='main'>

            <Box
                sx={{
                    pt: 2,
                    pb: 6
                }}
            >
                <Container maxWidth='md'>
                    

                    <Stack
                        sx={{ pt: 2, display: 'flex', flexDirection: 'column' }}
                        derection='row'
                        spacing={2}
                        justifyContent='center'
                    >
                        <Button variant='contained'>
                            Nuevo Ejercicio
                        </Button>

                        <Button variant='contained'>
                            Nuevo Ejercicio
                        </Button>
                    </Stack>
                </Container>
            </Box>

        </Container>
    );
}

export default CmpCurso;