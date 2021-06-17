import React, { useState } from 'react';
import './Movie.css';
import { Card } from 'react-bootstrap';
import Modal from 'react-modal';
import NoPoster from '../no-poster.png';

Modal.setAppElement('#root');

function Movie(props) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

  function formatTitle(title, year) {
    if (year === 'N/A' || year === undefined) {
      return title;
    }

    // Format movie title as "Title (Year)"
    return `${title} (${year})`;
  }

  function formatDate(dateString) {
    if (dateString === 'N/A' || dateString === undefined) {
      return dateString;
    }

    // Format date in the American style (Month Day, Year)
    let d = new Date(dateString);
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  function formatTime(timeString) {
    if (timeString === 'N/A' || timeString === undefined) {
      return timeString;
    }

    // Separate time into hours and minutes
    let time = timeString.match(/(\d+) min/)[1];
    let hours = Math.floor(time / 60);
    let mins = time % 60;

    if (hours !== 0) {
      return `${hours} hr ${mins} min`;
    }

    return `${mins} min`;
  }

  function formatMetascore(metascore) {
    let score = parseInt(metascore);
    if (metascore === 'N/A' || metascore === undefined || isNaN(score)) {
      return metascore;
    }

    // Value of score determines CSS class, which determines displayed color
    let scoreClass = '';
    if (score > 80) {
      scoreClass = 'score great';
    } else if (score > 60) {
      scoreClass = 'score good';
    } else if (score > 40) {
      scoreClass = 'score ok';
    } else if (score > 20) {
      scoreClass = 'score bad';
    } else {
      scoreClass = 'score awful';
    }

    return (
      <span className={scoreClass}>{score}/100</span>
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
                <Card.Title className="title">{formatTitle(movie.Title, movie.Year)}</Card.Title>

                <button className="moreInfo" onClick={() => open(movie.imdbID)}>More info</button>

                <Modal className="modal" overlayClassName="modalOverlay" isOpen={modalOpen} onRequestClose={() => setModalOpen(!modalOpen)}>
                  <div className="modalInfo">
                    <h2>{formatTitle(selection.Title, selection.Year)}</h2>
                    <p>Release Date: {formatDate(selection.Released)}</p>
                    <p>Runtime: {formatTime(selection.Runtime)}</p>
                    <p>Genre(s): {selection.Genre}</p>
                    <p>Director(s): {selection.Director}</p>
                    <p>Rating: {formatMetascore(selection.Metascore)}</p>
                    <br></br>
                    <p>{selection.Plot !== 'N/A' ? selection.Plot : 'No plot synopsis available.'}</p>
                  </div>
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
