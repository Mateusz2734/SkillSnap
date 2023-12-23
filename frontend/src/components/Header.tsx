import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Logo from "../assets/logo.svg";

const Header = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const navigateToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  const navigateToRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logOut();
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={Logo} alt="SkillShare Logo" width={100} />
      </Link>
      <div className="links"></div>
      <div className="buttons">
        {user ? (
          <button onClick={handleLogOut}>Log Out</button>
        ) : (
          <>
            <button onClick={navigateToLogin}>Log In</button>
            <button onClick={navigateToRegister}>Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
