import { Box, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import ShowPasswordIcon from "./ShowPasswordIcon";
import { Typography } from "@mui/material";
import FormErrorMessage from "./FormErrorMessage";
import { UserContext } from "../contexts/FirebaseAuthContext";

const signupFormValidationSchema = yup.object().shape({
    email: yup
        .string("Enter Your Email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    passwordConfirm: yup
        .string("Confirm password")
        .required("Must confirm password")
        .matches(/[0-9]/, "Password requires at least 1 number")
        .matches(/[a-z]/, "Password requires at least 1 lowercase letter")
        .matches(/[A-Z]/, "Password requires at least 1 uppercase letter")
        .matches(/[^\w]/, "Password requires at least 1 special character")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function SignupForm({ callback = null }) {
    const [showPW, setShowPW] = useState(false);
    const [showConfirmPW, setShowConfirmPW] = useState(false);
    const { handleCreateUser } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: signupFormValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await handleCreateUser(values.email, values.password, callback);
            } catch (error) {
                console.log(error);
                setSubmitting(false);
            }
        },
    });

    const handleShowPassword = () => {
        setShowPW((show) => !show);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPW((show) => !show);
    };

    return (
        <Box sx={{ mt: "25vh" }}>
            <Paper elevation={5} sx={{ p: 4 }}>
                <form onSubmit={formik.handleSubmit} id="signup-form">
                    <Typography variant="h6" align="center">
                        Signup
                    </Typography>

                    <TextField
                        fullWidth
                        sx={{ m: "auto", mb: 1, mt: 2 }}
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="filled"
                    />
                    {formik.errors.email ? (
                        <FormErrorMessage message={formik.errors.email} />
                    ) : null}
                    <TextField
                        fullWidth
                        sx={{ m: "auto", mb: 1 }}
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
                    {formik.errors.password ? (
                        <FormErrorMessage message={formik.errors.password} />
                    ) : null}
                    <TextField
                        fullWidth
                        sx={{ m: "auto", mb: 1 }}
                        id="passwordConfirm"
                        name="passwordConfirm"
                        label="Confirm Password"
                        type={showConfirmPW ? "" : "password"}
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.passwordConfirm &&
                            Boolean(formik.errors.passwordConfirm)
                        }
                        helperText={
                            formik.touched.passwordConfirm && formik.errors.passwordConfirm
                        }
                        variant="filled"
                        InputProps={{
                            endAdornment: (
                                <ShowPasswordIcon
                                    isVisible={showConfirmPW}
                                    handleIsVisible={handleShowConfirmPassword}
                                />
                            ),
                        }}
                    />
                    {formik.errors.passwordConfirm ? (
                        <FormErrorMessage message={formik.errors.passwordConfirm} />
                    ) : null}
                    <Button
                        sx={{ m: "auto" }}
                        size="small"
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        form="signup-form"
                        disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
