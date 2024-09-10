import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useCities } from "../Contexts/CityContext";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

function Map() {
  const { cities } = useCities();
  const {
    isLoading: isGeolocationLoading,
    position: geoPosition,
    getPosition: getGeoPosition,
  } = useGeolocation();
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
      <Button
        type={"position"}
        children={"Use my Geolocation"}
        onClick={getGeoPosition}
      />
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
        <AddForm />
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

function AddForm() {
  const navigate = useNavigate();
  const map = useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      console.log(e);
    },
  });
}

export default Map;
