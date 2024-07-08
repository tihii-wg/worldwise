import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
