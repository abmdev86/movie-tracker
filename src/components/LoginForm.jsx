import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { signInUser } from "../utils/firebaseAuth";
import { useContext, useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { UserContext, UserDispatchContext } from "../contexts/FirebaseAuthContext";

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
    const userDispatch = useContext(UserDispatchContext);
    const user = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {

            // const newUser = {
            //     id: Math.floor(Math.random() * max),
            //     name: values.email,
            //     token: "TestT001003" + values.password,

            // }
            // console.log('new user', newUser);

            await signInUser(values.email, values.password);

            // userDispatch({
            //     newId: newUser.id,
            //     newName: newUser.name,
            //     newToken: newUser.token,
            //     type: 'login'
            // });
        },
    });

    useEffect(() => {


        return () => console.log('context user now', user);
    }, [user])

    const handleShowPassword = () => {
        setShowPW((show) => !show);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: 5 }}>
            <form onSubmit={formik.handleSubmit} id='login-form' >
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

                    form='login-form'
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
