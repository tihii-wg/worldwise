import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const URL = "http://localhost:8000";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Problem with data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, loading }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCyties() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Wrong place");
  return context;
}
export { CityProvider, useCyties };
