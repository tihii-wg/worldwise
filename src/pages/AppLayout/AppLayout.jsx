import { useAuth } from "../../components/Contexts/AuthContext";
import Map from "../../components/Map/Map";
import SideBar from "../../components/SideBar/SideBar";
import User from "../../components/User/User";

import style from "./AppLayout.module.css";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={style.app}>
      {isAuthenticated ? <User /> : ""}
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
