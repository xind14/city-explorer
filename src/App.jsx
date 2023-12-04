import { useState } from 'react'

import axios from 'axios';

import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';


// Read in from .env.local file and live, it comes from "Environment Variables"
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {

  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  function changeCity(newCity) {

    // get the location data
    getLocation(newCity);

    // print a map
    console.log("Changing to", newCity);
  }

  // Use API (locationIQ) to get the lat/lon
  async function getLocation(cityName){

    // 1. Call the API asynchronously
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      // 2. Put the city into state
      setCity(response.data[0].display_name)

      // 3. Put the lat/lon into state
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);

    } catch(error) {
      console.error(error.message)
    }

  }

  return (
    <>
      <Header />
      <CityForm city={city} handleChangeCity={changeCity} />
      <Map latitude={latitude} longitude={longitude} />
    </>
  )
}

export default App
