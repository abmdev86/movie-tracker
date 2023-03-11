import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import UserMenu from "./UserMenu";

export default function Layout({ user }) {
    return (
        <>
            <Header pages={["Movies", "Reviews", "Favorites", "Login"]}>
                <UserMenu user={user} />
            </Header>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <Outlet />
                </Grid>
                {/* todo: add footer */}
            </Grid>
        </>
    );
}
