
import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from "./error.module.css";


//used chatgpt for how to use ?
function Error(props) {
  // const { error, onClose } = props;

  return props.error ? (
    <Alert variant="danger"  onClose={props.onClose} dismissible className={styles.alert}>
      <Alert.Heading>Error</Alert.Heading>
      <p>Please type in a valid city</p>
      <p>{props.error}</p>
    </Alert>
  ) : null;
}

export default Error;