import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const URL = "http://localhost:8000";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function fetchCurrentCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Problen with fetch current city");
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch {
      alert("Problen with post new city");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, fetchCurrentCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Wrong place");
  return context;
}
export { CityProvider, useCities };
