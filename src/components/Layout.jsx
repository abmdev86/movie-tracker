import { Container } from "@mui/material";
import Header from "./Header";
import UserMenu from "./UserMenu";

export default function Layout({ children }) {



    return (
        <Container maxWidth="xl">
            <Header pages={["Movies", "Reviews", 'Favorites']}>
                <UserMenu links={["Profile", 'Settings']} />

            </Header>
            <Container maxWidth='xs'>
                {children}
            </Container>


        </Container>
    )
}