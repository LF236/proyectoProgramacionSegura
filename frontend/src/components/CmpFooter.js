import { AppBar, Container, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const CmpFooter = () => {
    return (
        <footer style={{ position: 'relative', bottom: '0', width: '100%', backgroundColor: '#2196f3' }}>
            <CssBaseline />
            <Box sx={{ p: 1 }}>
                <Container maxWidth='lg'>
                    <Typography variant='subtitle2' color='white' align='center' sx={{
                        fontSize: {
                            lg: 15,
                            md: 15,
                            sm: 15,
                            xs: 10
                        }
                    }}>
                        {'Copyright © '}
                        <Link color='inherit' href='https://uv.mx/fei' target='_blank'>
                            Facultad de Estadistica e Informática
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {' '}
                    </Typography>
                </Container>
            </Box>
        </footer>
    );
}

export default CmpFooter;