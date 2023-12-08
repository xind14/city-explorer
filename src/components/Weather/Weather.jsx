import React, {useState} from "react";
import axios from "axios";



import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "./weather.module.css";

function Weather(props) {
  console.log("Weather props:", props.weather.forecast);
  return (
    <Container>
    <Row  sm={1} md={1} lg={5} className={styles.weather}>
      {props.weather.forecast &&
        props.weather.forecast.map((forecast, idx) => {
          // console.log("Forecast data:", forecast); // Add this line
          return (
            <Col key={idx} className={styles.day} >
              <Card className={styles.card}>
                <Card.Body  >
                  <Card.Title>City Forecast</Card.Title>
                  <Card.Text>Date: {forecast.date}</Card.Text>
                  <Card.Text>Forecast: {forecast.description}</Card.Text>
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

