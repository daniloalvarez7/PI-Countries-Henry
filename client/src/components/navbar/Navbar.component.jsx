import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return(
        <div className="nav">
            <NavLink to={'/'}>
                <img src="Desktop/PI-countries/mundo.jpg" alt="" srcset="" />
            </NavLink>
            <NavLink to={'/home'}>
                HOME
            </NavLink>
            <NavLink to={'/create'}>
                CREATE ACTIVITY
            </NavLink>
        </div>
    )
}

export default Navbar;