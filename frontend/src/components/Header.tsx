import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import {
  Avatar,
  Box,
  Dropdown,
  Menu,
  MenuButton,
  Button,
  MenuItem,
} from "@mui/joy";

import Logo from "../assets/logo.svg";

const Header = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleLogOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    logOut();
  };

  const handleProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="header">
      <Link to="/" style={{ margin: "0em 1em" }}>
        <img src={Logo} alt="SkillShare Logo" width={70} />
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginRight: "2em",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link style={{ fontWeight: 900 }} to="/offers">
          Offers
        </Link>
        {user?.role === "admin" && <Link to="/admin">Dashboard</Link>}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginRight: "2em",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {user ? (
          <Dropdown>
            <MenuButton sx={{ padding: 0, border: "none" }}>
              <Avatar
                alt={user.userId.toString()}
                src={`${apiUrl}?seed=${user.userId}`}
              />
            </MenuButton>
            <Menu>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </Dropdown>
        ) : (
          <>
            <Button variant="outlined" onClick={handleLogin}>
              Log In
            </Button>
            <Button variant="solid" onClick={handleRegister}>
              Register
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

const apiUrl = "https://api.dicebear.com/7.x/identicon/svg";

export default Header;
