import { Link } from "react-router-dom";
import "./Cards.css";
import comidaSana from "../../image/vegetal.png";

const Cards = (props) => {
  return (
    <div className="container">
      <div className="card">
        <Link to={`/home/${props.id}`}>
          <img src={props.image} alt={props.name} />
        </Link>
        <div className="intro">
          <h1>{props.name}</h1>
          <div className="">
            {props.diets?.map((element, index) => {
              return (
                <p key={index}> {element.name ? element.name : element}</p>
              );
            })}
          </div>
          <div className="health-score">
            <img src={comidaSana} alt="comida sana" />
            <span>{props.healthScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
