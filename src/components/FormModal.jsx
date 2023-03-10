import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
export default function FormModal({ label, children }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (

        <div>
            <Button onClick={handleOpen}>{label}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby={`modal-modal-${label.toLowerCase()}`}
                aria-describedby={`${label.toLowerCase()}-modal-form`}
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    {children}

                </Box>
            </Modal>
        </div>
    )

}

FormModal.propTypes = {
    label: PropTypes.string,

}