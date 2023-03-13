import { Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handleSuccessLogin = () => {
        return navigate(from, { replace: true });
    };

    return (
        <Container maxWidth="xs" sx={{ mt: "25vh" }}>
            <LoginForm callback={handleSuccessLogin} />
        </Container>
    );
}
