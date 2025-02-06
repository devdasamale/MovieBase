import React, { useEffect, useState } from "react";
import "./Search.css";
import Card from "../../components/Card/Card";

const Search = ({ movie }) => {
  const [showItems, setShowItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiKey = process.env.REACT_APP_API_KEY;

  async function fetchSearchData(page = 1) {
    try {
      const endpoint = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US&page=${currentPage}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${currentPage}`;

      const request = await fetch(endpoint);
      const response = await request.json();

      if (page === 1) {
        setShowItems(response.results);
      } else {
        setShowItems((prev) => [...prev, ...response.results]);
      }

      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  }

  useEffect(() => {
    fetchSearchData();
  }, []);

  const searchMovies = () => {
    setCurrentPage(1);
    fetchSearchData(1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchSearchData(nextPage);
    }
  };

  return (
    <div className="movie_list">
      <h2 className="list_title">Search Movie</h2>

      <div className="search-bar">
        <div className="input-field">
          <i
            className={
              searchQuery ? "fa-solid fa-xmark" : "fa-solid fa-magnifying-glass"
            }
            onClick={(e) => setSearchQuery("")}
          ></i>
          <input
            type="text"
            placeholder="Search movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="list_cards">
        {showItems.length > 1 ? (
          showItems.map((movie, i) => <Card key={i} movie={movie} />)
        ) : (
          <h1>Sorry..... No Movie Found</h1>
        )}
      </div>

      {showItems.length >= 20 ? (
        <button
          className="load_more_btn"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          Load More
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
