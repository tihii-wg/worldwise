import styles from "./Map.module.css";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useSearchParamsHook } from "../../hooks/useSearchParamsHook";
import { useNavigate } from "react-router-dom";
import { useGeolocationHook } from "../../hooks/useGeolocationHook";
import Button from "../Button/Button";

function Map() {
  const { cities } = useCities();
  const [position, setPosition] = useState([40, 2]);
  const [lat, lng] = useSearchParamsHook();
  const {
    isLoading: isGeolocationLoading,
    position: geolocationPosition,
    error,
    getPosition,
  } = useGeolocationHook();

  const flagemojiToPNG = (flag) => {
	let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
	  .map((char) => String.fromCharCode(char - 127397).toLowerCase())
	  .join("");
	return (
	  <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
	);
 };
	
  useEffect(
    function () {
      if (geolocationPosition)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isGeolocationLoading ? "Loading..." : "Use My Geoposition"}
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
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <DetectIvent />
        <SetMapPosition position={position} />
      </MapContainer>
    </div>
  );
}
function SetMapPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectIvent() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
