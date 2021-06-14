import React, { useState } from 'react';
import './Movie.css';
import { Card } from 'react-bootstrap';
import Modal from 'react-modal';
import NoPoster from '../no-poster.png';

Modal.setAppElement('#root');

function Movie(props) {
  const [selection, setSelection] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  function open(id) {
    async function fetchMovie() {
      const apiURL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}&r=json`;
      let response = await fetch(apiURL);
      response = await response.json();
      setSelection(response);
    }

    fetchMovie();
    setModalOpen(true);
  }

  function showInfo() {
    return (
      <div className="modalInfo">
        <h2>{selection.Title} ({selection.Year})</h2>
        <p>Release Date: {selection.Released}</p>
        <p>Runtime: {selection.Runtime}</p>
        <p>Genre(s): {selection.Genre}</p>
        <p>Director(s): {selection.Director}</p>
        <br></br>
        <p>{selection.Plot}</p>
      </div>
    );
  }

  return (
    <div>
      {props.movies.map(movie => {
        return (
          <Card className="card" key={movie.imdbID}>
            <Card.Img className="cardImage" src={movie.Poster !== 'N/A' ? movie.Poster : NoPoster}/>
            <div className="description">
              <Card.Body className="descriptionText">
                <Card.Title className="title">{movie.Title} ({movie.Year})</Card.Title>

                <button className="moreInfo" onClick={() => open(movie.imdbID)}>More info</button>
                <Modal className="modal" overlayClassName="modalOverlay" isOpen={modalOpen} onRequestClose={() => setModalOpen(!modalOpen)}>
                  {showInfo()}
                </Modal>
              </Card.Body>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Movie;
