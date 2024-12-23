import styles from "./CityList.module.css";

import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { useCities } from "../Contexts/CitiesContext";

function CityList() {
  const { cities, loading } = useCities();

  if (loading) return <Spinner />;

  if (!cities.length) return <Message message="Select country on map." />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;