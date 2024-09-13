import { useSearchParams } from "react-router-dom";

export function useCoordinats() {
  const [serchParams, setSerchParams] = useSearchParams();
  const lat = serchParams.get("lat");
  const lng = serchParams.get("lng");
  return [lat, lng];
}
