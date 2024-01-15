import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";

const Register = lazy(() => import("./pages/RegisterPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const Layout = lazy(() => import("./components/Layout"));
const Admin = lazy(() => import("./pages/AdminPage"));
const Missing = lazy(() => import("./pages/MissingPage"));
const Unauthorized = lazy(() => import("./pages/UnauthorizedPage"));
const PublicPage = lazy(() => import("./pages/PublicPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const Profile = lazy(() => import("./pages/ProfilePage"));
const OfferDetailsPage = lazy(() => import("./pages/OfferDetailsPage"));

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
          <Route path="/offers/:offerId" element={<OfferDetailsPage />} />
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
