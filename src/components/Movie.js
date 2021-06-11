import React, { useState } from 'react';
import './Movie.css';
import { Card } from 'react-bootstrap';
import NoPoster from '../no-poster.png';

function Movie(props) {
  const [movie, setMovie] = useState({});
  const [popUpOpen, setPopUpOpen] = useState(false);

  async function open(imdbID) {
    const apiURL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${imdbID}&r=json`;
    // console.log(apiURL);
    let response = await fetch(apiURL);
    response = response.json();
    console.log(response);
    setMovie(response);
  }

  return (
    <div>
      {props.movies.map(movie => {
        return (
          <Card className="card">
            <div className="image">
              <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : NoPoster}/>
            </div>
            <div className="description">
              <Card.Body className="descriptionText">
                <Card.Title>{movie.Title} ({movie.Year})</Card.Title>
                <Card.Text>{movie.imdbID}</Card.Text>
              </Card.Body>
            </div>
            {/*
            <div className="info">
              <button onClick={setPopUpOpen(!popUpOpen)}>More Info</button>
            </div>*/}
          </Card>
        );
      })}
    </div>
  );
}

export default Movie;
