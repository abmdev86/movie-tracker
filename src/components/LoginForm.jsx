import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import ShowPasswordIcon from "./ShowPasswordIcon";
import { Typography } from "@mui/material";
import { UserContext } from "../contexts/FirebaseAuthContext";


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



export default function LoginForm({ callback }) {
    const [showPW, setShowPW] = useState(false);
    const { handleLogin } = useContext(UserContext);


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // await signInUser(values.email, values.password);
                // if (callback !== null) {
                //     return callback();
                // }
                return handleLogin(values.email, values.password, callback);

            } catch (error) {
                console.error("LOGIN ERROR", error);
                setSubmitting(false);

            }
        },
    });

    const handleShowPassword = () => {
        setShowPW((show) => !show);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                padding: 5,
            }}
        >
            <form onSubmit={formik.handleSubmit} id="login-form">
                <Typography variant="h6" align="center" sx={{ mb: 2 }}>Login</Typography>
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
                    form="login-form"
                    disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
