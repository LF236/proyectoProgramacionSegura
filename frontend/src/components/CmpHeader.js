import { AppBar, Avatar, Button, Container, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import imgAdmin from '../assets/img/admin.jpg';
const CmpHeader = () => {
    const [ anchorElNav, setAnchorElNav ] = useState( null );
    const [ anchorElUser, setAnchorElUser ] = useState( null );

    const pages = [ 'Productos', 'Pricing', 'Blog' ];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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

    return (
        <>
            <CssBaseline />
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={ { mr: 2, display: { xs: 'none', md: 'flex' } } }
                        >
                            LOGO
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
                            LOGO
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
                                                <Typography textAlign='center'>{ setting }</Typography>
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

export default CmpHeader;