import { Box, Typography } from "@mui/material";


export default function FormErrorMessage({ message }) {
    return (
        <Box sx={{ display: 'block' }} >
            {message ? <Typography variant="subtitle" color='#ff1744' align="center" gutterBottom >{message}</Typography> : null}
        </Box>
    );
}
