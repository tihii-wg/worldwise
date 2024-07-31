import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [serchParams, setSerchParams] = useSearchParams();

  const lat = serchParams.get("lat");
  const lng = serchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>map</h1>
      <h1>
        position: {lat},{lng}
      </h1>
    </div>
  );
}

export default Map;
