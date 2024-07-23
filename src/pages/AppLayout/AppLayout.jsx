import Map from "../../components/Map/Map";
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
