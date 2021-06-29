import React, {useEffect, useState} from 'react';
import axios from './axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({title, fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState ([]);
  // A snippet of code which runs based on a specific conndition/variable.
  // useEffect is to make the code runs once
  useEffect (
    () => {
      // if [], run once when the row loads, and  dont run again
      async function fetchData () {
        const request = await axios.get (fetchUrl);
        // https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=123`
        // console.log (request.data.results);
        setMovies(request.data.results);

        return request;
      }
      fetchData ();
    },
    [fetchUrl]
  ); 

  // console.log(movies);

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      <div className="row__posters">
        {/* severals row__posters*/}
        {movies.map (movie => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
        ;
      </div>
    </div>
  );
}

export default Row;
