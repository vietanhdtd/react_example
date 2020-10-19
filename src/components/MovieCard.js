import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { filterVar } from "../configs/cache";
import { useReactiveVar } from "@apollo/client";
import "./style.scss";

export default function MovieCard({ data, onSelectMovie }) {
  const {
    title,
    poster_path,
    original_title,
    overview,
    release_date,
    vote_average,
  } = data || [];

  const listChecked = useReactiveVar(filterVar);

  const handleSelectedMovie = () => {
    onSelectMovie(data);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png";
  };

  const truncateString = (str, num = 10) => {
    if (!str) return;
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const whatToShow = listChecked.reduce(
    (o, cur) => ({ ...o, [cur.id]: cur.checked }),
    {}
  );

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
            {whatToShow["vote_average"] && vote_average}
          </Badge>
          <p className="h6 text-warning pt-1">
            {whatToShow["original_title"] && original_title}
          </p>
        </Card.Title>
        <Card.Text>{whatToShow["release_date"] && release_date}</Card.Text>
        <Card.Text>
          {whatToShow["overview"] && truncateString(overview, 50)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
