import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../../contexts/FirebaseAuthContext";

function getEditingForm(valueToEdit, currentValue, callback) {
  console.log("getEditForm", valueToEdit);
  switch (valueToEdit) {
    case "displayName": {
      return (
        <EditDisplayNameForm displayName={currentValue} callback={callback} />
      );
    }
    case "email": {
      return <EditEmailForm currentEmail={currentValue} callback={callback} />;
    }

    default: {
      return null;
    }
  }
}

const editDisplayNameValidation = yup.object().shape({
  displayName: yup
    .string("Enter a new Display name")
    .required("Display Name required"),
});

const editEmailValidation = yup.object({
  email: yup
    .string("Please Enter an email address")
    .email("Must be email format")
    .required("Please enter a value to update"),
});

const EditDisplayNameForm = ({ displayName, callback }) => {
  const { handleEditDisplayName } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      displayName: displayName ?? "",
    },
    validationSchema: editDisplayNameValidation,
    onSubmit: async (values) => {
      handleEditDisplayName(values.displayName, callback);
    },
  });

  return (
    <Box>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "auto",
          padding: 5,
        }}
        onSubmit={formik.handleSubmit}
        id="edit-displayName-form"
      >
        <TextField
          fullWidth
          id="displayName"
          name="displayName"
          label="Edit Display Name"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          error={
            formik.touched.displayName && Boolean(formik.errors.displayName)
          }
          helperText={formik.touched.displayName && formik.errors.displayName}
        />
        <Button
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
          form="edit-displayName-form"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

const EditEmailForm = ({ currentEmail, callback }) => {
  const { handleEditEmail } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: currentEmail ?? "",
    },
    validationSchema: editEmailValidation,
    onSubmit: async (values) => {
      await handleEditEmail(values.email, callback);
    },
  });

  return (
    <Box>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "auto",
          padding: 5,
        }}
        onSubmit={formik.handleSubmit}
        id="edit-email-form"
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Edit Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
          form="edit-email-form"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

const ProfileCard = ({ label, keyName, currentValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  let formComponent = getEditingForm(keyName, currentValue, handleEdit);
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        p: 2,
      }}
    >
      <Typography align="center" variant="h6">
        {label}
      </Typography>
      {isEditing ? (
        <>{formComponent}</>
      ) : (
        <Typography color="#f49d1a" align="center" variant="h5">
          {currentValue}
        </Typography>
      )}
      <Button variant="outlined" onClick={handleEdit} sx={{ mt: 2, m: "auto" }}>
        {!isEditing ? "Edit" : "Cancel"}
      </Button>
    </Paper>
  );
};

export default ProfileCard;
