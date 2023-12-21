import { Link } from "react-router-dom";

const Public = () => {
  return (
    <>
      <h1>What do you want to do?</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/linkpage">See the links</Link>
    </>
  );
};

export default Public;
