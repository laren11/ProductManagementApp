import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const titleStyle = {
  textDecoration: "none",
};

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <header>
      <div className="container">
        <div>
          <Link to="/" style={titleStyle}>
            <h1 className="nav-title">WorkHub</h1>
          </Link>
        </div>
        <div>
          <nav>
            {user ? (
              <div>
                <span>
                  <b>{user.email}</b>
                </span>
                <button onClick={handleClick}>Log out</button>

                {/*                 {user.isAdmin && (
                  <button
                    style={{ color: "orange", borderColor: "orange" }}
                    onClick={handleSubscriptionClick}
                  >
                    Subscription
                  </button>
                )} */}
              </div>
            ) : (
              <div>
                <button onClick={handleLoginClick} className="greenButton">
                  Log In
                </button>
                <button onClick={handleSignupClick}>Sign Up</button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
