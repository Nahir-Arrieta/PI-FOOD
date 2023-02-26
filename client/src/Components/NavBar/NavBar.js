
import { Link } from "react-router-dom";

import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/home" className="navbar-link">
          Home
        </Link>
        <Link to="/form" className="navbar-link">
          Create
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
