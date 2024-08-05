import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const { id } = useParams();
  const [serchParams, setSerchParams] = useSearchParams();
  const lat = serchParams.get("lat");
  const lng = serchParams.get("lng");

  const navigate = useNavigate();

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>map</h1>
      <h1>id:{id}</h1>
      <h1>
        position:{lat},{lng}
      </h1>
    </div>
  );
}

export default Map;
