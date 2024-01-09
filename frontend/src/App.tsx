import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";

import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Layout from "./components/Layout";
import Admin from "./pages/AdminPage";
import Missing from "./pages/MissingPage";
import Unauthorized from "./pages/UnauthorizedPage";
import PublicPage from "./pages/PublicPage";
import Health from "./pages/HealthPage";
import OffersPage from "./pages/OffersPage";
import Profile from "./pages/ProfilePage";

import "./App.css";

const ROLES = {
  User: "user",
  Admin: "admin",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC */}
        <Route path="/" element={<PublicPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* PROTECTED */}
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* CATCH */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
