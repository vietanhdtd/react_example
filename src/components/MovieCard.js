import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import "./style.scss";

export default function MovieCard({ data, onSelectMovie }) {
  const {
    original_title,
    id,
    title,
    video,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    popularity,
    vote_average,
  } = data || [];
  const handleSelectedMovie = () => {
    onSelectMovie(data);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png";
  };

  return (
    <Card className="movie-card" onClick={handleSelectedMovie}>
      <Card.Img
        variant="top"
        alt={title}
        src={poster_path}
        onError={handleImageError}
      />
      <Card.Body>
        <Card.Title>
          {title}
          <Badge style={{ float: "right" }} variant="warning">
            {vote_average}
          </Badge>
        </Card.Title>
        <Card.Text>{release_date}</Card.Text>
      </Card.Body>
    </Card>
  );
}
