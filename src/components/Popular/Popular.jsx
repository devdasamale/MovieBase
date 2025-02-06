import React, { useEffect, useRef, useState } from "react";
import "./Popular.css";

import { Link } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
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
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setPopularMovies(data.results);
    };
    fetchPopularMovies();
  }, [apiKey]);

  return (
    <>
      <div className="popular_movie_list">
        <h2 className="popular_list_title">Popular Movies</h2>
        <div className="popular_list">
          <div className="scrollLeft" onClick={() => handleScroll(-210)}>
            <FaChevronCircleLeft fontSize={"22px"} cursor={"pointer"} />
          </div>

          <div className="popular_list_card" ref={containerRef}>
            {popularMovies.map((movie, i) => (
              <Link
                to={`/movie/${movie.id}`}
                key={i}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="movie_card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="movie_poster"
                    loading="lazy"
                  />
                  <div className="movie_info">
                    <h2 className="movie_title">{movie.original_title}</h2>
                    <p className="movie_rating">
                      <i className="fas fa-star" /> {movie.vote_average}
                    </p>
                    <div className="card_description">
                      {movie ? movie.overview.slice(0, 90) + "..." : ""}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="scrollRight" onClick={() => handleScroll(210)}>
            <FaChevronCircleRight fontSize={"22px"} cursor={"pointer"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Popular;
