import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Link,
    Menu,
    Tooltip,
    Typography,
} from "@mui/material";
import LoginModal from './LoginModal';
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { UserContext } from "../contexts/FirebaseAuthContext";

export default function UserMenu({ links }) {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const user = useContext(UserContext);




    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={`${user?.name}'s profile`} src={user?.photoUrl} />
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
                <LoginModal isOnline={user?.online} >
                    <LoginForm />
                </LoginModal>
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
