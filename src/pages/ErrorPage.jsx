import { Container, Divider, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container maxWidth="xs">
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
        </Container>
    );
}
