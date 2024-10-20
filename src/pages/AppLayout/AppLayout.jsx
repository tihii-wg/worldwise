import { useAuth } from "../../components/Contexts/AuthContext";
import Map from "../../components/Map/Map";
import SideBar from "../../components/SideBar/SideBar";
import User from "../../components/User/User";

import style from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={style.app}>
      <User />
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
