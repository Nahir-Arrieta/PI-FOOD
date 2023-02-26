import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="containerLanding">
        <Link to="/home" className="linkButton">
          <button className="btn">
              HOME
          </button>
        </Link>
    </div>
  );
}

export default LandingPage;
