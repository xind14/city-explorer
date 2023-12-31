//used johns in class demo code
import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header.jsx";
import CityForm from "./components/CityForm/CityForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Map from "./components/Map/Map.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Error from "./components/Error/Error.jsx";
import Weather from "./components/Weather/Weather.jsx";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const CITY_API_KEY = import.meta.env.VITE_API_KEY;

const SERVER = import.meta.env.VITE_API_URL;

console.log(CITY_API_KEY);

function App() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  async function getLocation(cityName) {
    console.log(setError);

    let url = `https://us1.locationiq.com/v1/search?key=${CITY_API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      setCity(response.data[0].display_name);

      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      // setError(false);

      getWeather(cityName, response.data[0].lat, response.data[0].lon);
    } catch (error) {
      setError(error.message);
    }
  }

  async function getWeather(searchQuery, lat, lon) {
    //     console.log(setError);
    try {
      let weatherResponse = await axios.get(
        `${SERVER}/weather?searchQuery=${searchQuery}&latitude=${lat}&longitude=${lon}`
      );
      setWeather(weatherResponse.data);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
    }
  }

  async function getMovies(city) {
    //     console.log(setError);
    try {

      let movieResponse = await axios.get(`${SERVER}/movies?city=${city}`);
                  console.log(movieResponse);

      setMovies(movieResponse.data);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
    }
  }

  function changeCity(newCity) {
    getLocation(newCity);
    getMovies(newCity);
    console.log("Changing to", newCity);
  }

  return (
    <>
      <Header />
      <Error error={error} onClose={() => setError(false)} />
  
      <CityForm
        city={city}
        handleChangeCity={changeCity}
        latitude={latitude}
        longitude={longitude}
      />
  
      <div className="mapSection">
        {latitude !== null && longitude !== null && (
          <div>
            <p>
              Latitude: {latitude}, Longitude: {longitude}
            </p>
          </div>
        )}
        <Map latitude={latitude} longitude={longitude} />
      </div>
  <div>
    
      <Weather weather={weather} className="weatherSection"/>

  </div>
    

      <Movies movies={movies} handleGetMovies={getMovies} className="moviesSection"/>
      <Footer />
    </>
  );
  }
  export default App