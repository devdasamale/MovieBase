import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../Card/Card";
import "./Genre.css";

const Genre = () => {
  const [genreMovies, setGenreMovies] = useState([]);
  const { id } = useParams();
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setGenreMovies([]);
    setCurrentPage(1);
    setLoading(true);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchGenreName = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      const genre = data.genres.find((genre) => genre.id === parseInt(id));
      if (genre) {
        setGenreName(genre.name);
      }
    };
    fetchGenreName();
  }, [id, apiKey]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${id}&page=${currentPage}`
      );
      const data = await response.json();
      setGenreMovies((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
      setLoading(false);
    };
    fetchGenres();
  }, [apiKey, currentPage, id]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((next) => next + 1);
    }
  };

  return (
    <div className="main-genre-div">
      <span
        className="genre_back-btn"
        onClick={() => navigate(-1)}
        title="Go Back"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </span>
      <div className="genreComp_movie_list">
        <h2 className="genreComp_list_title">
          {genreName ? `${genreName} Movies` : "Loading..."}
        </h2>
        {loading && currentPage === 1 ? (
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="genreComp_list_cards">
            {genreMovies.map((movie, i) => (
              <Card key={i} movie={movie} />
            ))}
          </div>
        )}
        <button
          className="genreComp_load_more_btn"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Genre;
