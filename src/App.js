import { Paper, Typography } from "@mui/material";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Paper>
        <Typography variant="h1">Hello World!</Typography>
        <LoginForm />
      </Paper>
    </Layout>
  );
}

export default App;
