import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import MovieDisplay from "../components/MovieComponents/MovieDisplay";

const WelcomeDisplay = ({ displayName }) => {
    return (
        <Paper elevation={3} sx={{ mt: "25vh", p: 4 }}>
            <Typography variant="h3" align="center">
                Welcome to Movie Tracker
            </Typography>
            <Typography
                variant="body1"
                align="center"
            >{`Hello, ${displayName}`}</Typography>
        </Paper>
    );
};


export default function Home({ user }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <WelcomeDisplay displayName={user?.displayName || user?.email} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2" align="center" sx={{ mt: "5vh", p: 4 }}>
                    Featured
                </Typography>
                <Box sx={{ width: "100%" }}>
                    <Stack direction={{ xs: "column", sm: "row" }}>
                        <MovieDisplay isQuickView={true} rating={5} />
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
}
