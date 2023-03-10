import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Link,
    Menu,
    Tooltip,
    Typography,
} from "@mui/material";
import FormModal from './FormModal';
import { useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";

export default function UserMenu({ alt, src, links }) {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = () => {
        alert("logged in");
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        alert("logged out");
        setIsLoggedIn(false);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={alt ?? 'app-logo'} src={src ?? 'M'} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="user-menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {links.map((link, index) => (
                    <Link href={`/${link}`} key={index}>
                        <Typography key={index}>{link}</Typography>
                    </Link>
                ))}
                <Divider />
                <FormModal label={isLoggedIn ? 'Logout' : 'Login'} >
                    <LoginForm />
                </FormModal>
            </Menu>
        </Box>
    );
}

UserMenu.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    links: PropTypes.arrayOf(PropTypes.string),
};
