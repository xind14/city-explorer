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



import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'; 

import axios from "axios";
const SERVER = import.meta.env.VITE_API_URL;


function Movies (props) {
  const { movie, handleGetMovies, search } = props;


  useEffect(() => {
    async function fetchMovies(city) {
      try {
        let movieResponse = await axios.get(`${SERVER}/movies?city=${city}`);
        console.log(movieResponse);
        setMovies(movieResponse.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    }
  
    // change to props.search later when app is set up
    if (search) {
      fetchMovies(search);
    }
  }, [search]);
  
const [movies, setMovies] = useState([]);
  // Check if movies data is available
  if (movies.length === 0) {

    //debugging tool below will change to carousel above later 
    return (
      <div>
        <p>Loading movies...</p>
        <button onClick={() => handleGetMovies('NewCity')}>
          Load Movies
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Movies</h2>
      {movies.map((movie, index) => (
        <div key={index}>
          <p>Title: {movie.title}</p>
          <p>Overview: {movie.overview}</p>
          <img src= {movie.baseURL} alt={movie.title}/>       
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
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
      poster_path: PropTypes.string,
      popularity: PropTypes.number,
      release_date: PropTypes.string,        })
  ),
  handleGetMovies: PropTypes.func,
  search:PropTypes.string,
};

export default Movies;
