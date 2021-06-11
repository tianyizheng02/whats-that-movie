import React, { useState } from 'react';
import './Info.css';
import Movie from './Movie';

function Info() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showMovies, setShowMovies] = useState(false);

  function submit(e) {
    e.preventDefault();
    async function fetchMyAPI() {
      const title = encodeURIComponent(query);
      const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${title}&type=movie&page=${page}&r=json`;
      console.log(apiUrl);
      let response = await fetch(apiUrl);
      response = await response.json();
      console.log(response);
      console.log(response.Search);
      setMovies(response.Search);
    }
    fetchMyAPI();
    setShowMovies(true);
    setQuery("");
  }

  function displayMovies() {
    if (showMovies) {
      return (
        <Movie movies={movies}></Movie>
      );
    }
  }

  return (
    <div className="info">
      <form onSubmit={submit}>
        <label id="description" htmlFor="queryInput">Movie Name:</label>
        <input id="input" value={query} type="text"
          onChange={e => setQuery(e.target.value)}/>
        <button id="search">Search</button>
      </form>
      {displayMovies()}
    </div>
  );
}

export default Info;
