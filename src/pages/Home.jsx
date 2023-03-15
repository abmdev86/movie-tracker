import { Avatar, Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";


const WelcomeDisplay = ({ displayName }) => {

    return (
        <Paper elevation={3} sx={{ mt: '25vh', p: 4 }}>
            <Typography variant="h3" align="center">Welcome to  Movie Tracker</Typography>
            <Typography variant="body1" align="center">{`Hello, ${displayName}`}</Typography>
        </Paper>
    )
}

const MovieDisplay = () => {
    // todo split full view / short display 
    return (
        <Paper elevation={8} >
            <Grid container spacing={1} sx={{ p: 2 }}>
                <Grid item xs={12} sx={{ p: 2 }}>
                    <Typography variant="h6" align="center">
                        MOVIE TITLE

                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">
                        Description

                    </Typography>

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        This is a movie description

                    </Typography>

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">
                        Cast

                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">
                        <Box sx={{ m: 2 }}>
                            <Avatar />
                            <Typography>
                                Name
                            </Typography>
                        </Box>
                        <Box sx={{ m: 2 }}>
                            <Avatar />
                            <Typography>
                                Name
                            </Typography>
                        </Box>

                    </Typography>
                </Grid>
            </Grid>


        </Paper>
    );

}
export default function Home({ user }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <WelcomeDisplay displayName={user?.displayName || user?.email} />

            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2" align="center" sx={{ mt: '5vh', p: 4 }}>
                    Featured
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }}>

                        <MovieDisplay />
                    </Stack>
                </Box>

            </Grid>

        </Grid>
    );
}
