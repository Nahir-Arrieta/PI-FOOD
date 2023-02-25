import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="containerLanding">
      <button className="btn">
        <Link to="/home" className="linkButton">
          HOME
        </Link>
      </button>
    </div>
  );
}

export default LandingPage;
