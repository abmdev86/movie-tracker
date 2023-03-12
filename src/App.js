import RouteProtection from "./components/RouteProtection";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { UserContext } from "./contexts/FirebaseAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const { isLoggedIn, currentUser } = useContext(UserContext);

  console.log("APP::user -->", currentUser);
  return (
    <Routes>
      <Route element={<Layout user={currentUser} />}>
        <Route path="/" element={<Home user={currentUser} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RouteProtection isLoggedIn={isLoggedIn} />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
