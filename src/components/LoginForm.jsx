import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { signInUser } from "../utils/firebaseAuth";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";

const loginValidationSchema = yup.object({
    email: yup
        .string("Enter Your Email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

const ShowPasswordIcon = ({ isVisible, handleIsVisible }) => {
    return (
        <InputAdornment position="end">
            <IconButton onClick={handleIsVisible}>
                {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        </InputAdornment>
    );
};

export default function LoginForm() {
    const [showPW, setShowPW] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => signInUser(values.email, values.password),
    });

    const handleShowPassword = () => {
        setShowPW((show) => !show);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: 5 }}>
            <form onSubmit={formik.onSubmit} >
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="filled"
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPW ? "" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="filled"
                    InputProps={{
                        endAdornment: (
                            <ShowPasswordIcon
                                isVisible={showPW}
                                handleIsVisible={handleShowPassword}
                            />
                        ),
                    }}
                />

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
