import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";
import Layout from "../components/Layout";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);

    return (

        <Container maxWidth="xs">
            <Box sx={{ mt: '25vh' }}>
                <Typography variant="h1">Whoa!</Typography>
                <Typography variant="subtitle">
                    Sorry and unexpected error has occurred
                </Typography>
                <Typography variant="h6" align="center">
                    {error?.status}
                </Typography>

                <Divider />
                <Typography variant="body2" align="center">
                    <i>{error.statusText || error.message}</i>
                </Typography>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Box>

        </Container>


    );
}
