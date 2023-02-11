import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const res = await Location.getLastKnownPositionAsync();
      setLocation(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getLocation()
  }, [])

  return location;
};

export default useLocation;
