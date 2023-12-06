import React from "react";
import Card from 'react-bootstrap/Card';

function Weather(props) {
  console.log("Weather props:", props.weather.forecast);
  return (
    <div>
      {props.weather.forecast &&
        props.weather.forecast.map((forecast, idx) => {
          console.log("Forecast data:", forecast); // Add this line
          return (
            <Card key={idx} className="weatherDay">
              <Card.Text>Date: {forecast.date}</Card.Text>
              <Card.Text>Forecast: {forecast.description}</Card.Text>
            </Card>
          );
        })}
    </div>
  );
}

export default Weather;

