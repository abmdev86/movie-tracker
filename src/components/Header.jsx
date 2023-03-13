import {
    AppBar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ pages, children }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const theme = useTheme();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <AppBar position="static" color="secondary" sx={{ width: { xl: "100%" } }} enableColorOnDark>
            <Container maxWidth="xl">
                <Toolbar variant="dense" disableGutters>
                    <Link
                        to="/"
                        style={{
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <Typography
                            sx={{
                                marginRight: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            Movie Tracker
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, bgcolor: `${theme.palette.secondary.main}` }}>
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
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },

                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={`/${page.toLocaleLowerCase()}`}>
                                        <Typography noWrap sx={{ textDecoration: "none" }}>
                                            {page}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* add icon */}
                    <Link
                        to="/"
                        style={{
                            marginRight: 2,
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            Movie Tracker
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, }}>
                        {pages.map((page, index) => (
                            <Link
                                style={{ textDecoration: "none", color: "inherit" }}
                                key={index}
                                to={`/${page.toLocaleLowerCase()}`}
                            >
                                <Typography
                                    key={index}
                                    sx={{
                                        mr: 2,
                                        display: "block",
                                        letterSpacing: ".1rem",
                                    }}
                                >
                                    {page}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                    {children}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

Header.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.string),
};
