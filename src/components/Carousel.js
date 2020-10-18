import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";

export default function CustomCarousel({ data, onSelectMovie }) {
  if (!data) return null;

  return (
    <Row className="d-flex justify-content-center">
      <Carousel style={{ width: "90%", paddingTop: 20 }}>
        {data.map((movie, index) => (
          <Carousel.Item
            key={index}
            interval={1000}
            onClick={() => onSelectMovie(movie)}
          >
            <img
              className="d-block w-100"
              src={movie.backdrop_path}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{movie.title}</h3>
              {/* <p>{movie.over}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Row>
  );
}
