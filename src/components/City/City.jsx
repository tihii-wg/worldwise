import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import BackButton from "../BackButton/BackButton";
import { countryCodeEmoji } from "country-code-emoji";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { loading, fetchCurrentCity, currentCity } = useCities();

  //  const flagemojiToPNG = (flag) => {
  //    let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
  //      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
  //      .join("");
  //    return (
  //      <img src={`https://flagcdn.com/24x18/${!countryCode}.png`} alt="flag" />
  //    );
  //  };
  //  function getFlagEmoji(countryCode) {
  //	const codePoints = countryCode
  //	  .toUpperCase()
  //	  .split("")
  //	  .map((char) => 127397 + char.charCodeAt());
  //	return String.fromCodePoint(...codePoints);
  //	}

  const { cityName, emoji, date, notes } = currentCity;

  useEffect(
    function () {
      fetchCurrentCity(id);
    },
    [id, fetchCurrentCity]
  );

  if (loading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {currentCity.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
