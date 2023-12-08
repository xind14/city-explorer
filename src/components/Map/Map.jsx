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
