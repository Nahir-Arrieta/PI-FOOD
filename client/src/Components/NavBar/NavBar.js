// import { Link } from "react-router-dom";

// function NavBar() {
//   return (
//     <div>
//       <Link to="/home">Home</Link>
//       <Link to="/form">Create</Link>
//     </div>
//   );
// }

// export default NavBar;
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand">
        Comidas
      </Link>
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
