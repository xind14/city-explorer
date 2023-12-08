//used johns in class demo code
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header.jsx";
import CityForm from "./components/CityForm/CityForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Map from "./components/Map/Map.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Error from "./components/Error/Error.jsx";
import Weather from "./components/Weather/Weather.jsx";

const CITY_API_KEY = import.meta.env.VITE_API_KEY;

console.log(CITY_API_KEY);

function App() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(false);
  // const [movies, setMovies] = useState([]);

  const [searchedCity, setSearchedCity] = useState("");

  async function getLocation(cityName) {
    console.log(setError);

    let url = `https://us1.locationiq.com/v1/search?key=${CITY_API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      setCity(response.data[0].display_name);

      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      // setError(false);

      fetchWeather(cityName, response.data[0].lat, response.data[0].lon);
    } catch (error) {
      setError(error.message);
    }
  }




  // async function getMovies(city) {
  //   try {
  //     let movieResponse = await axios.get(`${SERVER}/movies?city=${city}`);
  //     console.log(movieResponse);

  //     setMovies(movieResponse.data);
  //   } catch (error) {
  //     console.error("Error fetching weather:", error.message);
  //   }
  // }

  function changeCity(newCity) {
    getLocation(newCity);
    fetchMovies(newCity);
    console.log("Changing to", newCity);
  }

  return (
    <>
      <Header />
      <Error error={error} onClose={() => setError(false)} />

      <CityForm
        city={city}
        handleSubmit={changeCity}
        latitude={latitude}
        longitude={longitude}
      />
      {latitude !== null && longitude !== null && (
        <div>
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        </div>
      )}
      <Map latitude={latitude} longitude={longitude} />
      <Weather weather={weather} />
      <Movies movies={movies} handleGetMovies={fetchMovies} />
      <Footer />
    </>
  );
}

export default App;



import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import "./CityForm.css";
import styles from "./cityform.module.css";

//used johns in class demo code

function CityForm(props) {

  const [searchedCity, setSearchedCity] = useState('');
  const [showHeading, setShowHeading] = useState(false);

  function handleChange(event) {
    console.log('handleChange called');
    setShowHeading(false);
    setSearchedCity( event.target.value );
  }

  function handleSubmit(event) {
    event.preventDefault();
       console.log(handleSubmit);
    setShowHeading(true);
    props.handleSubmit(searchedCity);
  }

  return (
    //use styles.name
  <div className={styles.form}>
      <Form onSubmit={handleSubmit} className='form'>
        <Form.Label>What City Are You In?</Form.Label>
        
        <Form.Control type="text" onChange={handleChange} placeholder="Enter a city" size='lg' />
  <Button variant="primary" type="submit" className={styles.button}>
        Explore!
      </Button>

    </Form>
    {
        showHeading && props.city && <h2 style={{ fontSize: '25px' }} > Information about {props.city} Below</h2>
      }
    

    </div>
  
  );
}

export default CityForm;

//used johns in class demo code
import React, {useState} from 'react';
import styles from './map.module.css';
import axios from "axios";

// const [city, setCity] = useState("");
// const [latitude, setLatitude] = useState(null);
// const [longitude, setLongitude] = useState(null);






import {When} from 'react-if';

import Figure from 'react-bootstrap/Figure';

const API_KEY = import.meta.env.VITE_API_KEY;

function Map(props) {

  return (
    <When condition={props.latitude && props.longitude}>
      <Figure className='map'>
      <Figure.Image
        alt="location map"
        src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${props.latitude},${props.longitude}&size=400x300&format=png`}
      />
      </Figure>
    </When>
  )
}

export default Map;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./weather.module.css";

const SERVER = import.meta.env.VITE_API_URL;

// function Weather(props) {
//   const [weather, setWeather] = useState([]);

//   useEffect(() => {
//     async function getWeather(searchQuery, lat, lon) {
//       try {
//         let weatherResponse = await axios.get(
//           `${SERVER}/weather?searchQuery=${searchQuery}&latitude=${lat}&longitude=${lon}`
//         );
//         setWeather(weatherResponse.data);
//       } catch (error) {
//         console.error("Error fetching weather:", error.message);
//       }
//     }

//     console.log("Weather props:", props.weather.forecast);
//   });


function Weather(props) {
    const [weather, setWeather] = useState([]);
  

useEffect(() => {
  console.log("Weather props:", props.weather.forecast);

  async function fetchWeather() {
    try {
        let weatherObject =  {
          params: {
            searchQuery: props.searchedCity,
            latitude: props.lat,
            longitude: props.lon,
          }
        };

      let weatherResponse = await axios.get(`${SERVER}/weather`, weatherObject);

      setWeather(weatherResponse.data);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
    }
  }

  fetchWeather();
}, [props.searchCity, props.lat, props.lon]);

  return (
    <Container>
      <Row sm={1} md={1} lg={5} className={styles.weather}>
        {weather.forecast &&
          weather.forecast.map((dailyForecast, idx) => {
            // console.log("Forecast data:", forecast); // Add this line
            return (
              <Col key={idx} className={styles.day}>
                <Card className={styles.card}>
                  <Card.Body>
                    <Card.Title>{`Forecast for ${weather.city_name}`}</Card.Title>
                    <Card.Text>Date: {dailyForecast.date}</Card.Text>
                    <Card.Text>Forecast: {dailyForecast.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Weather;


// import React, { useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import styles from './movies.module.css';

// function Movies(props) {
//   return (
//     <Carousel>
//       <Carousel.Item interval={600}>
//         <Image src={`https://image.tmdb.org/t/p/original${cityMovies.movie.poster_path}`}   />


//         <Carousel.Caption>
//           <h3>{props.movies.title}</h3>
//           <p>{props.movies.overview}</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default Movies;

// movie.title,
// movie.overview,
// movie.vote_average,
// movie.vote_count,
// movie.poster_path,
// movie.popularity,
// movie.release_date



import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'; 

import axios from "axios";
const SERVER = import.meta.env.VITE_API_URL;


function Movies (props) {
  const { movie, handleGetMovies, search } = props;


  useEffect(() => {
    async function fetchMovies(city) {
      try {
        let movieResponse = await axios.get(`${SERVER}/movies?city=${city}`);
        console.log(movieResponse);
        setMovies(movieResponse.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    }
  
    // change to props.search later when app is set up
    if (search) {
      fetchMovies(search);
    }
  }, [search]);
  
const [movies, setMovies] = useState([]);
  // Check if movies data is available
  if (movies.length === 0) {

    //debugging tool below will change to carousel above later 
    return (
      <div>
        <p>Loading movies...</p>
        <button onClick={() => handleGetMovies('NewCity')}>
          Load Movies
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Movies</h2>
      {movies.map((movie, index) => (
        <div key={index}>
          <p>Title: {movie.title}</p>
          <p>Overview: {movie.overview}</p>
          <img src= {movie.baseURL} alt={movie.title}/>       
        </div>
      ))}
    </div>
  );
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      overview: PropTypes.string,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
      poster_path: PropTypes.string,
      popularity: PropTypes.number,
      release_date: PropTypes.string,        })
  ),
  handleGetMovies: PropTypes.func,
  search:PropTypes.string,
};

export default Movies;



import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import './error.module.css';


//used chatgpt for how to use ?
function Error(props) {
  // const { error, onClose } = props;

  return props.error ? (
    <Alert variant="danger"  onClose={props.onClose} dismissible>
      <Alert.Heading>Error</Alert.Heading>
      <p>Please type in a valid city</p>
      <p>{props.error}</p>
    </Alert>
  ) : null;
}

export default Error;
