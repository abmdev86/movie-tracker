import { Paper, Typography } from "@mui/material";

export default function Home({ user }) {
    return (
        <Paper elevation={3} sx={{ mt: '25vh', p: 4 }}>
            <Typography variant="h2" align="center">Welcome to  Movie Tracker</Typography>
            <Typography variant="body1" align="center">{`Hello, ${user?.displayName || user?.name
                }`}</Typography>
        </Paper>
    );
}
