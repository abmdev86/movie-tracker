import { Grid } from "@mui/material";
import Header from "./Header";
import UserMenu from "./UserMenu";

export default function Layout({ children }) {
    return (
        <>
            <Header pages={["Movies", "Reviews", "Favorites"]}>
                <UserMenu links={["Profile", "Settings"]} />
            </Header>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    {children}
                </Grid>
                {/* todo: add footer */}
            </Grid>
        </>
    );
}
