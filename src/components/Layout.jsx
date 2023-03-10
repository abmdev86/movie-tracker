import { Container } from "@mui/material";
import Header from "./Header";
import UserMenu from "./UserMenu";

export default function Layout({ children }) {



    return (
        <Container maxWidth='xl' sx={{ m: 'auto', p: 0, }}>
            <Header pages={["Movies", "Reviews", 'Favorites']}>
                <UserMenu links={["Profile", 'Settings']} />

            </Header>

            <Container maxWidth='xl'>
                {children}
            </Container>


        </Container>
    )
}