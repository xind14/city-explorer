
//used johns in class demo code

import { useState } from 'react'

import axios from 'axios';

import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';

import Error from './components/Error.jsx'; 

import  './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = import.meta.env.VITE_API_KEY;

function App() {

  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [error, setError] = useState(null);

  function changeCity(newCity) {

    getLocation(newCity);

    console.log("Changing to", newCity);
  }

  async function getLocation(cityName){

    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      setCity(response.data[0].display_name)

      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      setError(null);
    } catch(error) {
      setError(error.message);
    }

  }

  return (
    <>
      <Header />
      <Error error={error} onClose={() => setError(null)} />
    
      <CityForm city={city} handleChangeCity={changeCity} />
      <Map latitude={latitude} longitude={longitude} />
 
    </>
  )
}

export default App
