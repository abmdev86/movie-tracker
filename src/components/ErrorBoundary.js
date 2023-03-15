import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container maxWidth="xs">
          <Box sx={{ mt: "25vh" }}>
            <Typography variant="h4" color="danger">
              {" "}
              Sorry, Something went wrong....
            </Typography>
            <a href="/">Home</a>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
