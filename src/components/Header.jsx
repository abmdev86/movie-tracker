import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import { useState } from "react";

export default function Header({ pages, children }) {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }
    return (
        <AppBar position="static" sx={{ width: { xl: '100%' }, }}>
            <Container maxWidth="xl" >
                <Toolbar variant="dense" disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex', },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'

                        }}
                    >
                        Movie Tracker
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}

                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography noWrap component='a' href={`/${page}`} sx={{ textDecoration: 'none' }}>

                                        {page}

                                    </Typography>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>

                    {/* add icon */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Movie Tracker
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {
                            pages.map((page, index) => (

                                <Typography key={index} component='a' href={`/${page}`} variant='button' sx={{ textDecoration: 'none', mr: 2, display: 'block', letterSpacing: '.1rem', color: 'inherit' }} >
                                    {page}
                                </Typography>

                            ))
                        }
                    </Box>
                    {children}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

Header.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.string)
}