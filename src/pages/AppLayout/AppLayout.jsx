import AppNav from "../../components/AppNav/AppNav";
import Map from "../../components/Map/Map";
import PageNav from "../../components/PageNav/PageNav";
import SideBar from "../../components/SideBar/SideBar";
import style from "./AppLayout.module.css";


function AppLayout() {
  return (
    <div className={style.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
