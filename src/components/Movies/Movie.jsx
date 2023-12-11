import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import styles from './movie.module.css';






function Movie({ movies}) {
  return (
    <Carousel className={styles.movieCarousel}>
      {movies.map((movie, index) => (
        <Carousel.Item key={index} interval={10000} >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className={styles.carouselImage}
          />

          <Carousel.Caption className={styles.carouselCaption}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

Movie.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      overview: PropTypes.string,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
      poster_path: PropTypes.string,
      popularity: PropTypes.number,
      release_date: PropTypes.string,
    })
  ),
};

export default Movie;
