import { useEffect, useState } from 'react';

interface UseCoordsState {
  lat: number;
  lon: number;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordsState | null>(null);

  useEffect(() => {
    const onSuccess = ({ coords }: GeolocationPosition) => {
      setCoords({
        lat: coords.latitude,
        lon: coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
