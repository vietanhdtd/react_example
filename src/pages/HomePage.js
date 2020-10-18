import React, { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import { FETCH_MOVIE } from "../configs/queries";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MovieCard, Carousel, Modal, NavBar } from "../components";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function HomePage() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [bottomRef, setBottomRef] = useState(null);

  const prevY = useRef(0);
  const page = useRef(1);

  const { error, data, fetchMore, loading } = useQuery(FETCH_MOVIE);

  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    fetchMore({
      query: FETCH_MOVIE,
      variables: {
        page: page.current + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const { nowPlaying } = fetchMoreResult;
        const { nowPlaying: prevNowPlaying } = prev;
        page.current = nowPlaying.page;
        setIsLoading(false);
        return {
          nowPlaying: {
            ...nowPlaying,
            movies: [...prevNowPlaying.movies, ...nowPlaying.movies],
          },
        };
      },
    });
  }, [fetchMore]);

  useEffect(() => {
    if (data) {
      page.current = data.nowPlaying.page;
    }
  }, [data, fetchMore]);

  useEffect(() => {
    let timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;
        if (prevY.current > y) {
          timeout = setTimeout(loadMore, 800);
        }
        prevY.current = y;
      },
      { threshold: 0.8 }
    );
    if (bottomRef) {
      observer.observe(bottomRef);
    }

    return () => {
      if (bottomRef) {
        observer.unobserve(bottomRef);
        clearTimeout(timeout);
      }
    };
  }, [fetchMore, loadMore, bottomRef]);

  if (error)
    return (
      <Alert variant="danger" dismissible>
        {"error"}
      </Alert>
    );

  const onSelectMovie = (movie) => {
    history.push(`/movie_detail/${movie.id}`, { id: movie.id });
  };

  const toggleModal = () => {
    setShow((show) => !show);
  };

  const transformData = (type, data) => {
    if (!data) return [];
    else {
      let newData = [...data.movies];
      return newData.sort((a, b) => b[type] - a[type]).slice(0, 5);
    }
  };

  const { nowPlaying } = data || [];

  const mostPopular = transformData("popularity", nowPlaying);
  const mostRated = transformData("vote_count", nowPlaying);

  return (
    <>
      <NavBar toggleModal={toggleModal} />

      <Container>
        {nowPlaying && (
          <>
            <Row>
              <Col>
                <p className="h3 pt-5 pl-3 text-warning">Most Popular</p>

                <Carousel data={mostPopular} onSelectMovie={onSelectMovie} />
              </Col>
              <Col>
                <p className="h3 pt-5 pl-3 text-warning">Most Rated</p>

                <Carousel data={mostRated} onSelectMovie={onSelectMovie} />
              </Col>
            </Row>
            <p className="display-4 pt-5 text-warning">Now Playing</p>
          </>
        )}
        <Row>
          {nowPlaying?.movies.map((item, index) => (
            <Col key={index} className="my-4 d-flex justify-content-center">
              <MovieCard data={item} onSelectMovie={onSelectMovie} />
            </Col>
          ))}
        </Row>

        <div
          ref={setBottomRef}
          style={{ height: 200 }}
          className="d-flex justify-content-center pt-5"
        >
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <p className="h6 text-white-50">
              Scroll down to load more movies ...
            </p>
          )}
        </div>
        <Modal centered show={show} toggleModal={toggleModal} />
      </Container>
    </>
  );
}
