import { NavLink } from "react-router-dom";
import mundo from "../../assets/mundo.jpg";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <NavLink className={"image"} to={"/"}>
        <img className="logo-image" src={mundo} alt="Logo" />
      </NavLink>
      <NavLink to={"/home"}>HOME</NavLink>
      <NavLink to={"/create"}>CREATE ACTIVITY</NavLink>
    </div>
  );
};

export default Navbar;
