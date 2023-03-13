import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { UserContext } from "../contexts/FirebaseAuthContext";

const LogoutScreen = ({ handleClose }) => {
    const { handleLogout } = useContext(UserContext);
    const logout = async () => {
        await handleLogout(handleClose);
    };
    return (
        <>
            <Typography variant="h6" align="center" sx={{ p: 2 }}>
                Are you sure you want to logout?
            </Typography>
            <Stack spacing={2} direction="row">
                <div style={{ margin: "auto" }}>
                    <Button variant="contained" color="error" onClick={logout}>
                        Logout
                    </Button>
                    <Button onClick={handleClose} variant="outlined" sx={{ m: 2 }}>
                        Close
                    </Button>
                </div>
            </Stack>
        </>
    );
};

export default function LoginModal({ isOnline }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Box style={{ padding: 4, margin: 4, }}>
            <Button color="primary" variant="outlined" onClick={handleOpen}>{isOnline ? "Logout" : "Login"}</Button>
            {!isOnline ? (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="login-modal"
                    aria-describedby="login-modal-form"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            width: 400,
                            bgcolor: `${theme.palette.secondary.main}`,
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <LoginForm callback={handleClose} />
                    </Box>
                </Modal>
            ) : (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="logout-modal"
                    aria-describedby="logout-modal-form"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            width: 400,
                            bgcolor: `${theme.palette.secondary.main}`,
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <LogoutScreen handleClose={handleClose} />
                    </Box>
                </Modal>
            )}

        </Box>
    );
}

LoginModal.propTypes = {
    isOnline: PropTypes.bool,
};
