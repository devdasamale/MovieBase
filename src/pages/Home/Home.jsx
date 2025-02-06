import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Popular from "../../components/Popular/Popular";
import TopRated from "../../components/TopRated/TopRated";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trending, setTrending] = useState([]);

  const [genre, setGenre] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(5);
  const { type } = useParams();

  const apiKey = process.env.REACT_APP_API_KEY;

  const containerRef = useRef();

  const handleScroll = (scrollAmount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setPopularMovies(data.results);
    };

    fetchPopularMovies();

    window.scrollTo(0, 0);
  }, [apiKey]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setTrending(data.results);
    };
    fetchTrendingMovies();
  }, [apiKey]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setGenre(data.genres);
    };
    fetchGenres();
  }, [apiKey]);

  const formatTitle = (title) => {
    return (
      title
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()) + " Movies"
    );
  };

  const loadMoreMovies = () => {
    setVisibleMovies((prev) => prev + 5);
  };

  return (
    <>
      <div className="poster" style={{ position: "relative" }}>
        <Carousel
          showThumbs={false}
          autoPlay
          transitionTime={3}
          infiniteLoop
          showStatus={false}
          showIndicators={false}
        >
          {popularMovies.map((movie, i) => (
            <Link
              to={`/movie/${movie.id}`}
              key={i}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_title}
                  loading="lazy"
                />
              </div>
              <div className="posterImage_overlay">
                <div className="posterImage_title">{movie.original_title}</div>
                <div className="posterImage_runtime">
                  {movie.release_date}
                  <span className="posterImage_rating">
                    {movie.vote_average} <i className="fas fa-star" />
                  </span>
                </div>
                <div className="posterImage_description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>

      {/* Popular Movies */}
      <Popular />

      {/* Trending Movies */}
      <div className="trending_movie_list">
        <h2 className="trending_list_title">
          {formatTitle(type || "Trending")}
        </h2>
        <div className="trending_list_cards">
          {trending.slice(0, visibleMovies).map((movie, i) => (
            <Card key={i} movie={movie} />
          ))}
        </div>
        {visibleMovies < trending.length && (
          <button className="trending_load_more_btn" onClick={loadMoreMovies}>
            Load More
          </button>
        )}
      </div>

      {/* Genres */}
      <div className="genre_list">
        <h2 className="genre_list_title">Genres</h2>
        <div className="scroll-genre-list">
          <div className="scrollLeft" onClick={() => handleScroll(-100)}>
            <FaChevronCircleLeft fontSize={"22px"} cursor={"pointer"} />
          </div>
          <div className="genre_list_cards" ref={containerRef}>
            {genre.map(({ name, id }, i) => (
              <Link to={`/genre/${id}`} key={i + 1} name={name}>
                <div className="genre_card">
                  <p>{name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="scrollRight" onClick={() => handleScroll(100)}>
            <FaChevronCircleRight fontSize={"22px"} cursor={"pointer"} />
          </div>
        </div>
      </div>

      {/* Toprated Movies */}
      <TopRated />
    </>
  );
};

export default Home;
