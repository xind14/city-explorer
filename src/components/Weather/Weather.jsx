import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "./weather.module.css";
import WeatherDay from "./WeatherDay";
function Weather(props) {
  console.log("Weather props:", props.weather.forecast);

  return (
    <>
    
    <Container>
      <Row sm={1} md={1} lg={5} className={styles.forecast}>
        {props.weather.forecast &&
          props.weather.forecast.map((forecast, idx) => {
            return (
              <Col key={idx} className={styles.dayforecast}>
                <WeatherDay date={forecast.date} description={forecast.description} />
              </Col>
            );
          })}
      </Row>
    </Container>

    </>
  );
}

export default Weather;
