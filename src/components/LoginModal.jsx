import { Box, Button, Stack, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { signUserOut } from '../utils/firebaseAuth';




const LogoutScreen = ({ handleClose }) => {
    const handleLogout = () => {
        signUserOut(handleClose);
    }
    return (
        <>
            <Typography variant='h6' align='center' sx={{ p: 2 }}>Are you sure you want to logout?</Typography>
            <Stack spacing={2} direction='row'>
                <div style={{ margin: 'auto' }}>
                    <Button variant='contained' color="error" onClick={handleLogout} >Logout</Button>
                    <Button onClick={handleClose} variant='outlined' sx={{ m: 2 }}>Close</Button>
                </div>

            </Stack>
        </>

    )
}


export default function LoginModal({ label: isOnline, children }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (

        <div>
            <Button onClick={handleOpen}>{isOnline ? 'Logout' : 'Login'}</Button>
            {
                !isOnline ? (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='login-modal'
                        aria-describedby={`${isOnline.toLowerCase()}-modal-form`}
                    >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                            {children}

                        </Box>
                    </Modal>
                ) : (

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='logout-modal'
                        aria-describedby={`${isOnline.toLowerCase()}-modal-form`}
                    >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                            <LogoutScreen handleClose={handleClose} />
                        </Box>
                    </Modal>
                )
            }

        </div>
    )

}

LoginModal.propTypes = {
    label: PropTypes.string,

}