
import {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//used johns in class demo code

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
    <>
      <Form onSubmit={handleSubmit} className='form'>
      <Form.Group className="mb-3" controlId="formGroupCity">
        <Form.Label>What City Are You In?</Form.Label>
        <Form.Control type="text" onChange={handleChange} placeholder="Seattle, WA" />
      </Form.Group>
  <Button variant="primary" type="submit" >
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