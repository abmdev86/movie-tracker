import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/FirebaseAuthContext"
import { useFormik } from "formik";
import * as yup from "yup";

const editDisplayNameValidation = yup.object().shape({
    displayName: yup.string('Enter a new Display name').required('Display Name required'),
});

const DisplayNameEditForm = ({ displayName, callback }) => {
    const { handleEditDisplayName } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            displayName: displayName ?? '',
        },
        validationSchema: editDisplayNameValidation,
        onSubmit: async (values) => {
            handleEditDisplayName(values.displayName, callback);
        }
    })

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            padding: 5,
        }}>
            <form onSubmit={formik.handleSubmit} id='edit-displayName-form'>
                <TextField fullWidth id='displayName' name="displayName" label='Edit Display Name'
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                    helperText={formik.touched.displayName && formik.errors.displayName}

                />
                <Button type="submit" variant="contained" form="edit-displayName-form" disabled={!formik.isValid || formik.isSubmitting}>Submit</Button>
            </form>
        </Box>
    )

}

const ProfileDisplayName = ({ currentUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const handleDisplayNameEdit = () => {
        setIsEditing(prev => !prev);
    }
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', p: 2 }} >
            <Typography align="center" variant="h6">Display Name:</Typography>
            {isEditing ? (
                <DisplayNameEditForm displayName={currentUser?.displayName} callback={handleDisplayNameEdit} />

            ) : (

                <Typography color='#f49d1a' align="center" variant="h5">{currentUser?.displayName}</Typography>

            )}

            <Button variant="outlined" onClick={handleDisplayNameEdit} sx={{ mt: 2, width: '50vw', m: 'auto', }}>{!isEditing ? 'Edit' : 'Cancel'}</Button>


        </Paper>
    )
}

export default function Profile() {
    const { currentUser } = useContext(UserContext)



    return (
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <Typography align="center" variant="h1">{currentUser?.displayName ?? currentUser?.email}'s Profile Page</Typography>
            </Grid>
            <Grid item xs={12}>
                <ProfileDisplayName currentUser={currentUser} />
            </Grid>
            <Grid item xs={4}>

                <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', p: 2 }} >
                    <Typography align="center" variant="subtitle">Profile Photo:</Typography>
                    <Avatar sx={{ width: 200, height: 200, m: 'auto' }} alt={`${currentUser.displayName} avatar`} src={currentUser?.photoURL ?? 'https://picsum.photos/200'} />
                    <Button variant="outlined" sx={{ mt: 2, }}>Edit</Button>
                </Paper>
            </Grid>

        </Grid>

    )
}