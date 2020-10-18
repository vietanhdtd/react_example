import gql from "graphql-tag";

const movieFragment = gql`
  fragment movie_Movie on Movie {
    original_title
    id
    title
    video
    poster_path
    backdrop_path
    overview
    release_date
    popularity
    vote_average
    vote_count
    original_language
  }
`;

const FETCH_MOVIE = gql`
  query fetchMovies($page: Int) {
    nowPlaying(page: $page) {
      movies {
        ...movie_Movie
      }
      count
      total
      page
      totalPage
    }
  }
  ${movieFragment}
`;

const MOVIE_DETAIL = gql`
  query getMovieDetail($movieId: ID!) {
    details(movieId: $movieId) {
      ...movie_Movie
    }
  }
  ${movieFragment}
`;

export { FETCH_MOVIE, MOVIE_DETAIL };
