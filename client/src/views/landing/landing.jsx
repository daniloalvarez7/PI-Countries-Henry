import "./landing.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">
      <p className="landing-text">Bienvenido a la Landing Page</p>
      <NavLink className="landing-link" to={"/home"}>
        HOME
      </NavLink>
    </div>
  );
};

export default Landing;
