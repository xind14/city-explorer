//used johns in class demo code
import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header.jsx";
import CityForm from "./components/CityForm/CityForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Map from "./components/Map/Map.jsx";
import Error from "./components/Error/Error.jsx";
import Weather from "./components/Weather/Weather.jsx";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const API = import.meta.env.VITE_API_URL;

console.log(API_KEY);

function App() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);

  async function getLocation(cityName) {
    console.log(setError);

    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      setCity(response.data[0].display_name);

      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      setError(false);

      getWeather(response.data[0].lat, response.data[0].lon);

    } catch (error) {
      setError(error.message);
    }
  }





  async function getWeather(lat, lon) {
    //     console.log(setError);
    try {
      let weatherResponse = await axios.get(
        `${API}/weather?latitude=${lat}&longitude=${lon}`
      );
      setWeather(weatherResponse.data);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
    }
  }

  function changeCity(newCity) {
    getLocation(newCity);

    console.log("Changing to", newCity);
  }

  return (
    <>
      <Header />
      <Error error={error} onClose={() => setError(false)} />

      <CityForm city={city} handleChangeCity={changeCity} />
      {latitude !== null && longitude !== null && (
        <div>
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        </div>
      )}
      <Map latitude={latitude} longitude={longitude} />
      <Weather weather={weather || []} />
      <Footer />
    </>
  );
}

export default App;
