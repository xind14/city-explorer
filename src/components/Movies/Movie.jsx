import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import styles from './movies.module.css';

function Movie({ title, overview, poster_path }) {
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item interval={600}>
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          className={styles.carouselImage}
        />

        <Carousel.Caption>
          <h3>{title}</h3>
          <p>{overview}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

Movie.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
};

export default Movie;
