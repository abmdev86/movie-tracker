import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/FirebaseAuthContext";
import ProfileCard from "../components/ProfileComponents";

export default function Profile() {
    const { currentUser } = useContext(UserContext);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="h1">
                    {currentUser?.displayName ?? currentUser?.email}'s Profile Page
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <ProfileCard
                    label="Display Name"
                    keyName="displayName"
                    currentValue={currentUser.displayName}
                />
            </Grid>
            <Grid item xs={6}>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        p: 2,
                    }}
                >
                    <Typography align="center" variant="subtitle">
                        Profile Photo:
                    </Typography>
                    <Avatar
                        sx={{ width: 200, height: 200, m: "auto" }}
                        alt={`${currentUser.displayName} avatar`}
                        src={currentUser?.photoURL ?? "https://picsum.photos/200"}
                    />
                    <Button variant="outlined" sx={{ mt: 2 }}>
                        Edit
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <ProfileCard
                    label="Email"
                    keyName="email"
                    currentValue={currentUser.email}
                />
            </Grid>
        </Grid>
    );
}
