import React, { useState } from 'react';
import './Info.css';
import Movie from './Movie';

function Info() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(0);
  const [page, setPage] = useState(1);
  const [showMovies, setShowMovies] = useState(false);

  async function fetchMovies(pageNum) {
    setPage(pageNum);
    const title = encodeURIComponent(query);
    const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${title}&type=movie&page=${pageNum}&r=json`;

    let response = await fetch(apiUrl);
    response = await response.json();

    // Ensure that state variables are never undefined
    setResults(response.totalResults !== undefined ? response.totalResults : 0);
    setMovies(response.Search !== undefined ? response.Search : []);
    setShowMovies(response.totalResults !== undefined ? true : false);
  }

  function submit(e) {
    e.preventDefault();
    fetchMovies(1);
  }

  return (
    <div className="info">
      <div id="searchHeader">
        <form onSubmit={submit}>
          <label id="description" htmlFor="queryInput">Movie Name:</label>
          <input id="input" value={query} type="text"
            onChange={e => setQuery(e.target.value)}/>
          <button id="search">Search</button>
        </form>

        {showMovies ? <button className="nav" disabled={page === 1} onClick={() => fetchMovies(page - 1)}>Previous Page</button> : <></>}
        {showMovies ? <button className="nav" disabled={page * 10 >= results} onClick={() => fetchMovies(page + 1)}>Next Page</button> : <></>}
      </div>

      {showMovies ? <Movie class="searchResult" movies={movies}></Movie> : <></>}
    </div>
  );
}

export default Info;
