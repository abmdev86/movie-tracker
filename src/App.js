import RouteProtection from "./components/RouteProtection";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { UserContext } from "./contexts/FirebaseAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import UserSettingsPage from "./pages/UserSettingsPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { element } from "prop-types";

function App() {
  const { isLoggedIn, currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<Layout user={currentUser} />}>
        <Route path="/" element={<Home user={currentUser} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RouteProtection isLoggedIn={isLoggedIn} />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route element={<RouteProtection isLoggedIn={isLoggedIn} />}>
          <Route path="/settings/:id" element={<UserSettingsPage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          ErrorBoundary={<ErrorBoundary />}
          element={<Navigate to="/" replace={true} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
