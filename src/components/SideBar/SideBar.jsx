import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Footer from "../Footer/Footer";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SideBar;
