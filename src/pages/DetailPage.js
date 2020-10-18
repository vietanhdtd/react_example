import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_DETAIL } from "../configs/queries";
import "./style.scss";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";

export default function DetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

  const { id: movieId } = useParams();
  const { loading, error, data } = useQuery(MOVIE_DETAIL, {
    variables: { movieId },
  });

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png";
  };

  if (error) return <p>Error :(</p>;

  const {
    vote_count,
    title,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    original_language,
    vote_average,
  } = data?.details || [];

  return (
    <div className="detail-page">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(${backdrop_path})`,
        }}
      />
      {!loading && (
        <div className="container">
          <p className="h5 text-warning link" onClick={() => history.goBack()}>
            go back
          </p>
        </div>
      )}
      <Container className="content">
        <Row>
          {loading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <>
              <Col xs={4} style={{ paddingLeft: 0 }}>
                <Image
                  src={poster_path}
                  style={{ width: 350, height: 515 }}
                  onError={handleImageError}
                />
              </Col>
              <Col className="movie-info">
                <p className="display-3 text-warning">{title}</p>
                <p className="h6 pb-4">{overview}</p>
                <Row>
                  <Col>
                    <p className="h6 text-white-50">Release Date</p>
                    <p className="h4 text-warning">{release_date}</p>
                  </Col>
                  <Col>
                    <p className="h6 text-white-50">Vote Average</p>
                    <p className="h4 text-warning">{vote_average}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="h6 text-white-50">Vote Count</p>
                    <p className="h4 text-warning">{vote_count}</p>
                  </Col>
                  <Col>
                    <p className="h6 text-white-50">Original Language</p>
                    <p className="h4 text-warning">{original_language}</p>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <div className="dimmer-bg" />
    </div>
  );
}
