import { Container } from "@mui/material";
import SignupForm from "../components/SignupForm";
import { redirect } from "react-router-dom";
export default function Signup() {

    const handleSuccessSignup = () => {
        return redirect('/');
    }
    return (
        <Container maxWidth="xs"

        >
            <SignupForm callback={handleSuccessSignup} />
        </Container>
    );
}
