import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Dropdown,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  Divider,
  Link,
} from "@mui/joy";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ColorSchemeToggle } from "./ColorToggle";
import { useAuth } from "../hooks/useAuth";
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
    <Box className="header">
      <Box>
        <Link underline="none" href="/">
          <img src={Logo} alt="SkillSnap Logo" width={70} />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginRight: "2em",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link underline="none" href="/offers">
          Offers
        </Link>
        {user?.role === "admin" && (
          <Link underline="none" href="/admin">
            Dashboard
          </Link>
        )}
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
        <ColorSchemeToggle />
        {user ? (
          <Dropdown>
            <MenuButton sx={{ padding: 0, border: "none" }}>
              <Avatar
                alt={user.userId.toString()}
                src={`${apiUrl}?seed=${user.userId}`}
              />
            </MenuButton>
            <Menu variant="solid" color="primary" size="sm">
              <MenuItem onClick={handleProfile}>
                <FontAwesomeIcon icon={faUser} />
                Profile
              </MenuItem>
              <Divider orientation="horizontal" color="red" />
              <MenuItem onClick={handleLogOut}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                Log Out
              </MenuItem>
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
    </Box>
  );
};

const apiUrl = "https://api.dicebear.com/7.x/identicon/svg";

export default Header;
