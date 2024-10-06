// "https://api.bigdatacloud.net/data/reverse-geocode?latitude=0&longitude=0"
//"https://api.geoapify.com/v1/geocode/reverse?lat=0&lon=0&apiKey=ba108f9ec4d248ffa4d8ffeab757081f"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import Message from "../Message/Message";
import BackButton from "../BackButton/BackButton";
import DatePicker from "react-datepicker";
import { useSearchParamsHook } from "../../hooks/useSearchParamsHook";
import Spinner from "../Spinner/Spinner";

//export function convertToEmoji(countryCode) {
//  const codePoints = countryCode
//    .toUpperCase()
//    .split("")
//    .map((char) => 127397 + char.charCodeAt());
//  return String.fromCodePoint(...codePoints);
//}

const flagemojiToPNG = (flag) => {
  let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

//const BaseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
const BaseUrl2 = "https://api.geoapify.com/v1/geocode/reverse?";
const ApiKey = "&apiKey=ba108f9ec4d248ffa4d8ffeab757081f";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [isFetchCityLoading, setIsFetchCityLoading] = useState(false);
  const [lat, lng] = useSearchParamsHook();
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      async function fetchCity() {
        if (!lat && !lng) return;

        try {
          setIsFetchCityLoading(true);
          setGeocodingError("");
          const res = await fetch(`${BaseUrl2}lat=${lat}&lon=${lng}${ApiKey}`);
			  const data = await res.json();
			  
			  
          if (!data.features[0].properties.country_code)
            throw new Error("no country");
          setCityName(
            data.features[0].properties.city ||
              data.features[0].properties.country ||
              ""
          );
          setCountry(data.features[0].properties.country);
          setEmoji(data.features[0].properties.country_code);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsFetchCityLoading(false);
        }
      }
      fetchCity();
    },
    [lat, lng]
  );

  if (!lat && !lng) return <Message message={"Click somewhere on the map"} />;

  if (isFetchCityLoading) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date) => setDate(date)} selected={date} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
