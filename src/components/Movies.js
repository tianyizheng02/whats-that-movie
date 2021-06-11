import React from 'react';
import './Movies.css';
import { Card } from 'react-bootstrap';
import NoPoster from '../no-poster.png';

function Movies(props) {
  return (
    <div>
      {props.movies.map(movie => {
        return (
          <Card className="card">
            <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : NoPoster}/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Year}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default Movies;
