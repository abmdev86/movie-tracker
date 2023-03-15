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
import Movies from "./pages/Movies";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<Layout user={currentUser} />}>
        <Route path="/" element={<Home user={currentUser} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RouteProtection />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route element={<RouteProtection />}>
          <Route path="/settings/:id" element={<UserSettingsPage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
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
