import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;

  const { id } = useParams();

  const [serchParams, setSerchParams] = useSearchParams();
  const lat = serchParams.get("lat");
  const lng = serchParams.get("lng");
  return (
    <>
      <h1>City {id}</h1>
      <h1>
        Position: {lat},{lng}
      </h1>
      <button
        onClick={() => {
          setSerchParams({ lat: 4523252525, lng: 56235365475686 });
        }}
      >
        new position
      </button>
    </>
  );
  //  return (
  //    <div className={styles.city}>
  //      <div className={styles.row}>
  //        <h6>City name</h6>
  //        <h3>
  //          <span>{emoji}</span> {cityName}
  //        </h3>
  //      </div>

  //      <div className={styles.row}>
  //        <h6>You went to {cityName} on</h6>
  //        <p>{formatDate(date || null)}</p>
  //      </div>

  //      {notes && (
  //        <div className={styles.row}>
  //          <h6>Your notes</h6>
  //          <p>{notes}</p>
  //        </div>
  //      )}

  //      <div className={styles.row}>
  //        <h6>Learn more</h6>
  //        <a
  //          href={`https://en.wikipedia.org/wiki/${cityName}`}
  //          target="_blank"
  //          rel="noreferrer"
  //        >
  //          Check out {cityName} on Wikipedia &rarr;
  //        </a>
  //      </div>

  //      <div>
  //        <ButtonBack />
  //      </div>
  //    </div>
  //  );
}

export default City;
