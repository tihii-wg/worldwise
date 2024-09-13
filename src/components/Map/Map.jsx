import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
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
import { useCoordinats } from "../../hooks/useCoordinats";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";

function Map() {
  const { cities } = useCities();
  const [position, setPosition] = useState([40, 0]);
  const [lat, lng] = useCoordinats();
  const {
    isLoading: isGeolocationLoading,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {!isGeolocationLoading ? "Use my geolocation" : "Loading..."}
        </Button>
      )}
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
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <FormDetect />
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

function FormDetect() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
