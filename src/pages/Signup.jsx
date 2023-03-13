import { Container } from "@mui/material";
import SignupForm from "../components/SignupForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function Signup() {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const handleSuccessSignup = () => {
        return navigate(from, { replace: true });
    };
    return (
        <Container maxWidth="xs">
            <SignupForm callback={handleSuccessSignup} />
        </Container>
    );
}
