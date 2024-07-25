import CountryItem from "../CountryItem/CountryItem";
import Spinner from "../Spinner/Spinner";

function CountryList({ cities, loading }) {
  if (loading) return <Spinner />;

  return (
    <ul>
      {cities.map((city) => (
        <CountryItem key={city.id} />
      ))}
    </ul>
  );
}

export default CountryList;
