import React, { useState } from 'react';
import './Info.css';
import Movies from './Movies';

function Info() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [showMovies, setShowMovies] = useState(false);

  function submit(e) {
    e.preventDefault();
    async function fetchMyAPI() {
      const searchParam = encodeURIComponent(query);
      const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchParam}`;
      console.log(apiUrl);
      let response = await fetch(apiUrl);
      response = await response.json();
      console.log(response.Search);
      setMovies(response.Search);
    }
    fetchMyAPI();
    setShowMovies(true);
    setQuery("");
  }

  return (
    <div className="info">
      <form onSubmit={submit}>
        <label htmlFor="queryInput">Search Movie Name:</label>
        <input
          id="queryInput"
          value={query}
          type="text"
          onChange={e => setQuery(e.target.value)}/>
        <button className="search">Submit</button>
      </form>
      {showMovies ? <Movies movies={movies}></Movies> : <></>}
    </div>
  );
}

export default Info;
