import { Grid, Paper, Typography, Avatar, Box } from "@mui/material";
import MovieQuickDisplay from "./MovieQuickDisplay";
import StarRateIcon from '@mui/icons-material/StarRate';

export default function MovieDisplay({
    isQuickView,
    title,
    description,
    photoURL,
    rating = 1,
}) {

    if (isQuickView) {
        return (
            <MovieQuickDisplay title={title} photoURL={photoURL} rating={rating} />
        );
    } else {
        return (
            <Paper elevation={8}>
                <Grid container spacing={1} sx={{ p: 2 }}>
                    <Grid item xs={12} sx={{ p: 2 }}>
                        <Typography variant="h6" align="center">
                            {title ?? " MOVIE TITLE"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src="https://api.lorem.space/image/movie?w=150&h=220" alt={`${title}'s movie poster`} />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body1">
                            {description ?? " This is a movie description"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Cast</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ m: 2 }}>
                            <Avatar />
                            <Typography>Name</Typography>
                        </Box>
                        <Box sx={{ m: 2 }}>
                            <Avatar />
                            <Typography>Name</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle">Rating</Typography>
                        <Typography variant="h6">{rating}<span style={{ padding: 2, color: '#FFD700' }}><StarRateIcon /></span></Typography>
                    </Grid>

                </Grid>
            </Paper>
        );
    }
}