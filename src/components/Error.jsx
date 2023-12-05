
import React from 'react';
import Alert from 'react-bootstrap/Alert';

//used chatgpt for how to use ?
function Error(props) {
  const { error, onClose } = props;

  return error ? (
    <Alert variant="danger" onClose={onClose} dismissible>
      <Alert.Heading>Error</Alert.Heading>
      <p>Please type in a valid city</p>
      <p>{error}</p>
    </Alert>
  ) : null;
}

export default Error;
