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
            searchQuery: props.search,
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
}, [props.search, props.lat, props.lon]);

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
