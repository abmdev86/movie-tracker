import { Grid, Paper, Typography } from '@mui/material'
import RatingDisplay from './RatingDisplay'

export default function MovieQuickDisplay({ title, photoURL, rating }) {

    return (
        <Paper elevation={8}>
            <Grid container spacing={1} sx={{ p: 2 }}>
                <Grid item xs={12} sx={{ p: 2 }}>
                    <Typography variant="h6" align="center">
                        {title ?? " MOVIE TITLE"}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <img
                        src={
                            photoURL ?? "https://api.lorem.space/image/movie?w=150&h=220"
                        }
                        alt={`${title}'s poster cover`}
                    />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="body1">
                        {<RatingDisplay rating={rating} /> ?? " quick view rating"}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}