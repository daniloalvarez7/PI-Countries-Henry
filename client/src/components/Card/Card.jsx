import "./card.css";
import { Link } from "react-router-dom";

const Card = ({ country }) => {
  const { name, id, flag_image, continent, capital, area, population } =
    country;

  return (
    <div className="card-container">
      <Link to={`/detail/${id}`}>
        <h2> {name} </h2>
        <h2> {continent} </h2>
        <img src={country.flag_image} className="flag_image"></img>
      </Link>
    </div>
  );
};

export default Card;
