import RouteProtection from "./components/RouteProtection";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import UserProvider, { UserContext } from "./contexts/FirebaseAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const user = useContext(UserContext);
  return (
    <Routes>
      <Route element={<Layout user={user} />}>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile/:id"
          element={
            <UserProvider>
              <RouteProtection>
                <Profile />
              </RouteProtection>
            </UserProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
