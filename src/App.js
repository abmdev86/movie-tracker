import { Paper, Typography } from "@mui/material";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import UserProvider from "./contexts/FirebaseAuthContext";

function App() {
  return (
    <UserProvider>
      <Layout>
        <Paper>
          <Typography variant="h1">Hello World!</Typography>
          <LoginForm />
        </Paper>
      </Layout>
    </UserProvider>
  );
}

export default App;
