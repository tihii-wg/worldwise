import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();

const URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Uknown type");
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //  const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);
  //  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        //  setLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        //  setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Problem with fetch cities data",
        });
        //} finally {
        //  //  setLoading(false);
        //}
      }
    }
    fetchCities();
  }, []);

  const fetchCurrentCity = useCallback(
    async function fetchCurrentCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        //setLoading(true);
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
        //setCurrentCity(data);
      } catch {
        dispatch({
          type: "rejected",
          payload: "Problen with fetch current city",
        });

        // } finally {
        //   //setLoading(false);
        // }
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      //setLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      //setCities((cities) => [...cities, data]);
    } catch {
      dispatch({
        type: "rejected",
        payload: "Problen with create current city",
      });
      // } finally {
      //   //setLoading(false);
      // }
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      //setLoading(true);
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
      //setCities(cities.filter((city) => city.id !== id));
    } catch {
      dispatch({
        type: "rejected",
        payload: "Problen with delete current city",
      });

      // } finally {
      //   //setLoading(false);
      // }
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCurrentCity,
        createCity,
        deleteCity,
      }}
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
