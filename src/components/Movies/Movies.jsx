// import React, { useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import styles from './movies.module.css';

// function Movies(props) {
//   return (
//     <Carousel>
//       <Carousel.Item interval={600}>
//         <Image src={`https://image.tmdb.org/t/p/original${cityMovies.movie.poster_path}`}   />


//         <Carousel.Caption>
//           <h3>{props.movies.title}</h3>
//           <p>{props.movies.overview}</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default Movies;

// movie.title,
// movie.overview,
// movie.vote_average,
// movie.vote_count,
// movie.poster_path,
// movie.popularity,
// movie.release_date

// ... (imports)


import React from 'react';
import PropTypes from 'prop-types'; 
function Movies(props) {
  const { movies, handleGetMovies } = props;

  // Check if movies data is available
  if (movies.length === 0) {
    // If no movies data, you can display a loading message or trigger a fetch
    return (
      <div>
        <p>Loading movies...</p>
        <button onClick={() => handleGetMovies('NewCity')}>
          Load Movies
        </button>
      </div>
    );
  }

  // If movies data is available, render the movie information
  return (
    <div>
      <h2>Movies</h2>
      {movies.map((movie, index) => (
        <div key={index}>
          <p>Title: {movie.title}</p>
          <p>Overview: {movie.overview}</p>
          <img src= {movie.baseURL}/>       
                {/* Add other movie details */}
        </div>
      ))}
    </div>
  );
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      overview: PropTypes.string,
      // Add other prop types for movie details
    })
  ),
  handleGetMovies: PropTypes.func,
};

export default Movies;
