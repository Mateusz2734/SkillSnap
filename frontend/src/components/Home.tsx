import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    logOut();
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <p>Your role: {user?.role}</p>
      <br />
      <Link to="/admin">Go to the Admin page</Link>

      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
