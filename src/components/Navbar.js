import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthcontext";
const Navbar = () => {
  const { logout } = useLogOut();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };


  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Deadline Tracker</h1>
        </Link>
        <nav>
          {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {!user && (
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
          )}
        </nav>
        
      </div>
    </header>
  );
};

export default Navbar;
