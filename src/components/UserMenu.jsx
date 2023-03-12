import { Avatar, Box, Divider, IconButton, Menu, Tooltip } from "@mui/material";
import LoginModal from "./LoginModal";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/FirebaseAuthContext";
import { Link } from "react-router-dom";

const authLinks = ["Profile", "My movies"];
const unAuthLinks = ["Signup"];

const FirebaseAuthUserLinks = ({ userId }) => {
    return authLinks.map((link, index) => (
        <Box sx={{ flexGrow: 1, m: "auto" }} key={index}>
            <Link
                to={`/${link.replace(" ", "-").toLocaleLowerCase()}/${userId}`}
                style={{
                    marginRight: 2,
                    display: { xs: "flex" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    padding: 2,
                }}
                key={index}
            >
                {link}
            </Link>
        </Box>
    ));
};

const GuestUserLinks = () => {
    return unAuthLinks.map((link, index) => (
        <Link
            to={`/${link.replace(" ", "-").toLocaleLowerCase()}`}
            key={index}
            style={{
                marginRight: 2,
                display: { xs: "flex" },
                padding: 2,
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
            }}
        >
            {link}
        </Link>
    ));
};

export default function UserMenu() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { currentUser, isLoggedIn } = useContext(UserContext);

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
                    <Avatar
                        alt={`${currentUser?.name}'s profile`}
                        src={currentUser?.photoUrl}
                    />
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
                {isLoggedIn ? (
                    <FirebaseAuthUserLinks userId={currentUser?.id} />
                ) : (
                    <GuestUserLinks />
                )}
                <Divider />
                <LoginModal isOnline={isLoggedIn} />
            </Menu>
        </Box>
    );
}
