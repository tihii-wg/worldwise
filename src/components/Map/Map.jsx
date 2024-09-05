import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../Contexts/CityContext";
import { useEffect, useState } from "react";

function Map() {
  const { cities } = useCities();
  const { id } = useParams();
  const [position, setPosition] = useState([40, 0]);

  const [serchParams] = useSearchParams();
  const lat = serchParams.get("lat");
  const lng = serchParams.get("lng");

  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <SetForm />
        <ChengeCenter position={position} />
      </MapContainer>
    </div>
  );
}
function ChengeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function SetForm() {
  const navigate = useNavigate();
  const map = useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
