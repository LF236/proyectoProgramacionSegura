import { AppBar, Avatar, Button, Container, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Link } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import imgAdmin from '../assets/img/admin.jpg';
import { logout } from '../services/authServices';
const CmpHeader = ( { userInfo } ) => {
    const [ anchorElNav, setAnchorElNav ] = useState( null );
    const [ anchorElUser, setAnchorElUser ] = useState( null );

    const pages = [ 'Cursos', 'Tareas pendientes' ];
    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const settings = [ 'Logout' ];

    const handleCloseNavMenu = () => {
        setAnchorElNav( null );
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser( null );
    }

    const handleOpenNavMenu = ( e ) => {
        setAnchorElNav( e.currentTarget );
    }

    const handleOpenUserMenu = ( e ) =>{
        setAnchorElUser( e.currentTarget );
    }

    const optionsMenuItem = ( e ) => {
        // Pensar en el uso de un Switch
        const nameFunction = `${ e.target.innerHTML }`.toLowerCase();
        switch( nameFunction ) {
            case 'logout': 
                if( logout() ) {
                    window.location = '/home';
                }
                break;
        }
    }
    const testing = false;
    console.log( userInfo );
    if( !userInfo ) {
        return(
            <>
                <CssBaseline />
                <AppBar position='fixed'>
                    <Container maxWidth='x1'>
                        <Toolbar disableGutters>
                            <Typography
                                variant='h6'
                                noWrap
                                component='div'
                                sx={ { mr: 2, display: { xs: 'none', md: 'flex' } } }
                            >
                                <Link href='/' color='inherit' underline='none'>FEI</Link>
                            </Typography>

                            <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
                                <Typography
                                    variant='h6'
                                    noWrap
                                    component='div'
                                    sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }
                                >
                                    <Link href='/' color='inherit' underline='none'>FEI</Link>
                                </Typography>
                            </Box>
                        </Toolbar>
                    </Container>

                </AppBar>
            </>
        )
    } else {
        return (
            <>
                <CssBaseline />
                <AppBar position='fixed'>
                    <Container maxWidth='xl'>
                        <Toolbar disableGutters>
                            <Typography
                                variant='h6'
                                noWrap
                                component='div'
                                sx={ { mr: 2, display: { xs: 'none', md: 'flex' } } }
                            >
                                <Link href='/' color='inherit' underline='none'>FEI</Link>
                            </Typography>

                            <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
                                <IconButton
                                    size='large'
                                    aria-label='account of current user'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    color='inherit'
                                    onClick={ handleOpenNavMenu }
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id='menu-appbar'
                                    anchorEl={ anchorElNav }
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    open={ Boolean( anchorElNav ) }
                                    onClose={ handleCloseNavMenu }
                                    sx={{
                                        display: { xs: 'block', md: 'none' }
                                    }}
                                >
                                    {
                                        pages.map( page => {
                                            return(
                                                <MenuItem key={ page } onClick={ handleCloseNavMenu }>
                                                    <Typography textAlign='center'>{ page }</Typography>
                                                </MenuItem>
                                            )
                                        } )
                                    }
                                </Menu>
                            </Box>

                            <Typography
                                variant='h6'
                                noWrap
                                component='div'
                                sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }
                            >
                                <Link href='/' color='inherit' underline='none'>FEI</Link>
                            </Typography>

                            <Box sx={ { flewGrow: 1, display: { xs: 'none', md: 'flex' } } }>
                                {
                                    pages.map( page => {
                                        return(
                                            <Button
                                                key={ page }
                                                sx={ { color: 'white', my: 2, display: 'block' } }
                                                onClick={ handleCloseNavMenu }
                                            >
                                                { page }
                                            </Button>
                                        )
                                    } )
                                }
                            </Box>

                            <Box sx={ { flexGrow: 0, position: 'absolute', right: 0 } }>
                                <Tooltip title='Open Settings'>
                                    <IconButton sx={ { p: 0 } } onClick={ handleOpenUserMenu }>
                                        <Avatar alt='img_user' src={ imgAdmin }/>
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={ { mt: '45px' } }
                                    id='menu-appbar'
                                    anchorEl={ anchorElUser }
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    open={ Boolean( anchorElUser ) }
                                    onClose={ handleCloseUserMenu }
                                >
                                    {
                                        settings.map( setting => {
                                            return(
                                                <MenuItem key={ setting } onClick={ handleCloseUserMenu }>
                                                    <Typography textAlign='center' onClick={ optionsMenuItem }>{ setting }</Typography>
                                                </MenuItem>
                                            );
                                        } )
                                    }
                                </Menu>
                            </Box>

                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        );
    }
}

export default CmpHeader;