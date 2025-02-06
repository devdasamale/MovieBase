import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setMovieList([]);
    setCurrentPage(1);
    setLoading(true);
    window.scrollTo(0, 0);
  }, [type]);

  useEffect(() => {
    async function fetchData() {
      let request = await fetch(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=${apiKey}&language=en-US&page=${currentPage}`
      );
      let response = await request.json();

      if (type === "upcoming") {
        response.results.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      }

      setMovieList((prev) => [...prev, ...response.results]);
      setTotalPages(response.total_pages);

      setLoading(false);
    }
    fetchData();

  }, [apiKey, currentPage, type]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((next) => next + 1);
    }
  };

  const formatTitle = (title) => {
    return (
      title
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()) + " Movies"
    );
  };
  return (
    <div className="movie_list">
      <h2 className="list_title">{formatTitle(type ? type : "")}</h2>

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
        <div className="list_cards">
          {movieList.map((movie, i) => (
            <Card key={i} movie={movie} />
          ))}
        </div>
      )}

      <button
        className="load_more_btn"
        onClick={nextPage}
        disabled={currentPage >= totalPages}
      >
        Load More
      </button>
    </div>
  );
};

export default MovieList;


