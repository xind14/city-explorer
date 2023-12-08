import React from "react";
import Card from 'react-bootstrap/Card';
import styles from "./weather.module.css";

function WeatherDay({ date, description }) {
  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>☁️🌤🌧Forecast🌩🌨☀️</Card.Title>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Forecast: {description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WeatherDay;
