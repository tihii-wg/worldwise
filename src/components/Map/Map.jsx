import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";

function Map() {
  const { id } = useParams();
  const [serchParams, setSerchParams] = useSearchParams();
  const lat = serchParams.get("lat");
  const lng = serchParams.get("lng");

  const position ={ [lat, lng]};

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
