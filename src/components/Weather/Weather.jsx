import React from "react";
import Card from 'react-bootstrap/Card';

function Weather(props) {
  console.log("Weather props:", props.weather);

  const renderWeather = () => {
    return props.weather.map((forecast, idx) => {
      console.log("Forecast data:", forecast); // Add this line
      return (
        <Card key={idx} className="weatherDay">
          <Card.Text>Date: {forecast.date}</Card.Text>
          <Card.Text>Forecast: {forecast.description}</Card.Text>
        </Card>
      );
    });
  };

  console.log("Rendered Weather:", renderWeather()); // Add this line

  return (
    <>
      {Array.isArray(props.weather) ? renderWeather() : <p>Loading data</p>}
    </>
  );
}

export default Weather;
