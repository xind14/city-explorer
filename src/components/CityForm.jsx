import {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function CityForm(props) {

  const [typedInCity, setTypedInCity] = useState('');
  const [showHeading, setShowHeading] = useState(false);

  function handleChange(e) {
    console.log('handleChange called');
    setShowHeading(false);
    setTypedInCity( e.target.value );
  }

  function handleSubmit(e) {
    e.preventDefault();
       console.log(handleSubmit);
 
    setShowHeading(true);
    props.handleChangeCity(typedInCity);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupCity">
        <Form.Label>What City Are You In?</Form.Label>
        <Form.Control type="text" onChange={handleChange} placeholder="Seattle, WA" />
      </Form.Group>
      {
        showHeading && props.city && <h2>Information about {props.city} Below</h2>
      }
      <Button variant="primary" type="submit" >
        Explore!
      </Button>
    </Form>
  );
}

export default CityForm;