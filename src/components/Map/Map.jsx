
import React from 'react';
import { When } from 'react-if';
import Figure from 'react-bootstrap/Figure';
import styles from "./map.module.css";


const API_KEY = import.meta.env.VITE_API_KEY;

function Map(props) {


  return (
    <When condition={props.latitude && props.longitude}>
      <Figure className={styles.map}>
        {/* <Figure.Caption className={styles.caption}>
        {props.showHeading && props.city && (
            <h2 style={{ fontSize: '25px' }}>Information about {props.city} Below</h2>
          )}
        </Figure.Caption> */}
        <Figure.Image
          alt="location map"
          src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${props.latitude},${props.longitude}&size=400x300&format=png`}
        />
      </Figure>
    </When>
  );
}

export default Map;

















