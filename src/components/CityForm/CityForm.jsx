
import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./cityform.module.css";

//used johns in class demo code

function CityForm(props) {

  const [typedInCity, setTypedInCity] = useState('');
  const [showHeading, setShowHeading] = useState(false);

  function handleChange(event) {
    console.log('handleChange called');
    setShowHeading(false);
    setTypedInCity( event.target.value );
  }

  function handleSubmit(event) {
    event.preventDefault();
       console.log(handleSubmit);
 
    setShowHeading(true);
    props.handleChangeCity(typedInCity);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className='form'>
        <Form.Label>What City Are You In?</Form.Label>
        
        <Form.Control type="text" onChange={handleChange} placeholder="Enter a city" size='lg' />
  <Button variant="primary" type="submit" className='form-button'>
        Explore!
      </Button>

    </Form>
    {
        showHeading && props.city && <h2 style={{ fontSize: '25px' }} > Information about {props.city} Below</h2>
      }
    

    </>
  
  );
}

export default CityForm;