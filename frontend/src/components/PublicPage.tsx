import { Link } from "react-router-dom";

const PublicPage = () => {
  return (
    <>
      <h1>What do you want ot do?</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/linkpage">See the links</Link>
    </>
  );
};

export default PublicPage;
