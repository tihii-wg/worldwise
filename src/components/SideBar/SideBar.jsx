import Footer from "../Footer/Footer";
import Logo from "../Logo/Logo";
import PageNav from "../PageNav/PageNav";
import styles from "./Sidebar.module.css";

function SideBar() {
  return (
	  <div className={styles.sidebar}>
		  <Logo />
		  <PageNav />
		  <p>List of cities</p>
		  <Footer />
    </div>
  );
}

export default SideBar;
