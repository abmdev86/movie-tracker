import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    Tooltip,
    Typography,
} from "@mui/material";
import LoginModal from "./LoginModal";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/FirebaseAuthContext";

const authLinks = ["Profile", "My movies"];
const unAuthLinks = ["Signup"];

const FirebaseAuthUserLinks = ({ userId }) => {
    return authLinks.map((link, index) => (
        <Typography
            component="a"
            href={`/${link.replace(" ", "-").toLocaleLowerCase()}/${userId}`}
            sx={{
                mr: 2,
                display: { xs: "flex", },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
            }}
            key={index}
        >
            {link}
        </Typography>
    ));
};

const GuestUserLinks = () => {
    return unAuthLinks.map((link, index) => (
        <Typography
            href={`/${link.replace(" ", "-").toLocaleLowerCase()}`}
            key={index}
            component='a'
            sx={{
                mr: 2,
                display: { xs: "flex" },
                p: 2,
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
            }}
        >
            {link}
        </Typography>
    ));
};

export default function UserMenu() {
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
                {user?.online ? <FirebaseAuthUserLinks userId={user?.id} /> : <GuestUserLinks />}
                <Divider />
                <LoginModal isOnline={user?.online} />
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
