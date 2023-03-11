import { Paper, Typography } from "@mui/material";

export default function Home({ user }) {
    return (
        <Paper>
            <Typography variant="h1">{`Hello, ${user?.displayName || user?.name
                }`}</Typography>
        </Paper>
    );
}
