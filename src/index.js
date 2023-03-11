import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { analytics } from "./utils/firebaseConfig";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./contexts/FirebaseAuthContext";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import PrivateRoutes from "./components/RouteProtection";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile/:id",
    element: (
      <PrivateRoutes>
        <Profile />
      </PrivateRoutes>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(analytics);
