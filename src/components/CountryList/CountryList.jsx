import styles from "./CountryList.module.css";

import CountryItem from "../CountryItem/CountryItem";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { useCyties } from "../Contexts/CityContext";

function CountryList() {
  const { cities, loading } = useCyties();

  if (loading) return <Spinner />;

  if (!cities.length) return <Message message="Sellect cyti." />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
