import AppNav from "../../components/AppNav/AppNav";
import PageNav from "../../components/PageNav/PageNav";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
     <AppNav />
      <p>App</p>
    </div>
  );
}

export default AppLayout;
