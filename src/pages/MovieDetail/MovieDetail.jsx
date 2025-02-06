import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, removeMovie } from "../../Store/movieSlice";
import Card from "../../components/Card/Card";
import { FaArrowCircleRight } from "react-icons/fa";

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trending, setTrending] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(5);
  const [watchListClicked, setWatchListClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const dispatch = useDispatch();
  const watchListMovies = useSelector((state) => state.movieInfo.watchList);
  const navigate = useNavigate();
  const { id } = useParams();
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      let response = await request.json();
      setMovie(response);
      setWatchListClicked(
        watchListMovies.some((movie) => movie.id === response.id)
      );
      setLoading(false);
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [apiKey, id]);

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
    const fetchCrew = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      );
      const result = await response.json();
      setCast(result.cast);
    };
    fetchCrew();
  }, [apiKey, id]);

  const setBackDrop = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${
      currentMovieDetail ? currentMovieDetail.backdrop_path : ""
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "90%",
    width: "100%",
    position: "relative",
    alignItems: "center",
    color: "white",
  };

  let handleWatchList = () => {
    if (!watchListClicked) {
      setWatchListClicked(true);
      if (
        !watchListMovies.some((movie) => movie.id === currentMovieDetail.id)
      ) {
        dispatch(addMovies(currentMovieDetail));
      }
    } else {
      dispatch(removeMovie(currentMovieDetail.id));
      setWatchListClicked(false);
    }
  };

  const loadMoreMovies = () => {
    setVisibleMovies((prev) => prev + 5);
  };

  const handleWatchTrailer = async () => {
    if (!currentMovieDetail) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
          setShowTrailer(true);
        } else {
          alert("Trailer not available for this movie.");
        }
      } else {
        alert("Trailer not available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Failed to fetch the trailer. Please try again later.");
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerKey("");
  };

  return (
    <div className="main-div">
      <span className="back-btn" onClick={() => navigate(-1)} title="Go Back">
        <i className="fa-solid fa-arrow-left"></i>
      </span>

      {showTrailer && (
        <div className="trailer-modal">
          <div className="modal-content">
            <span
              className="close-btn"
              style={{ fontSize: "24px" }}
              onClick={closeTrailer}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameborder="0"
              width="100%"
              height="100%"
              title="Youtube Trailer"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      )}

      <div className="backdrop" style={{ ...setBackDrop, zIndex: 1 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 1,
          }}
        ></div>

        {loading ? (
          <div>
            <h1 style={{ fontSize: "32px" }}>Loading...</h1>
          </div>
        ) : (
          <div className="movie-section">
            <div className="section-left">
              <div className="movie-title">
                {currentMovieDetail ? currentMovieDetail.original_title : ""}
              </div>
              <div className="movie-tagline">
                {currentMovieDetail ? currentMovieDetail.tagline : ""}
              </div>
              <div className="movie-rating">
                <span>
                  Rating <i className="fa fa-star"></i> :{"  "}
                  {currentMovieDetail ? currentMovieDetail.vote_average : ""}
                </span>
                <span>
                  Votes <i className="fa fa-thumbs-up"></i> :{"  "}
                  {currentMovieDetail ? currentMovieDetail.vote_count : ""}
                </span>
              </div>
              <div className="movie-plot">
                {currentMovieDetail ? currentMovieDetail.overview : ""}
              </div>
              <div className="movie-info">
                <div>
                  <span>Status</span>
                  <span>
                    {currentMovieDetail ? currentMovieDetail.status : ""}
                  </span>
                </div>
                <div>
                  <span>Runtime</span>
                  <span>
                    {currentMovieDetail
                      ? currentMovieDetail.runtime + " Mins"
                      : ""}
                  </span>
                </div>
                <div>
                  <span>Released Date</span>
                  <span>
                    {currentMovieDetail ? currentMovieDetail.release_date : ""}
                  </span>
                </div>
                <div>
                  <span>Genres</span>
                  {currentMovieDetail
                    ? currentMovieDetail.genres.map(({ name }, i) => (
                        <span key={i}>
                          {name}
                          {i < currentMovieDetail.genres.length - 1
                            ? ", "
                            : "."}
                        </span>
                      ))
                    : ""}
                </div>
                <div className="production">
                  <span>Production Companies</span>
                  {currentMovieDetail
                    ? currentMovieDetail.production_companies.length > 0
                      ? currentMovieDetail.production_companies
                          .slice(0, 5)
                          .map(({ name }, i, arr) => (
                            <span key={i}>
                              {name}
                              {i < arr.length - 1 ? ", " : "."}
                            </span>
                          ))
                      : "."
                    : ""}
                </div>
              </div>
              <div className="section-left-2">
                <div className="watch-list" onClick={handleWatchList}>
                  <div className="addBtn">
                    {watchListClicked ? "Bookmarked" : "Add to Watchlist"}
                    <span>
                      <i
                        id="watch-list"
                        className={
                          watchListClicked
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </span>
                  </div>
                </div>

                <div className="watch-trailer" onClick={handleWatchTrailer}>
                  <div className="watchBtn">
                    Watch Trailer
                    <span>
                      <i id="watch-trailer" className="fa-solid fa-play"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-right">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    currentMovieDetail ? currentMovieDetail.poster_path : ""
                  }`}
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Movie Cast */}
      <h1 className="cast-heading" style={{ padding: "20px 10px" }}>
        Cast
      </h1>
      <div className="movie-cast">
        <div className="cast-list">
          {cast.slice(0, 10).map((cast, i) => {
            return (
              cast.profile_path && (
                <div className="cast-details" key={i + 1}>
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                        : "https://placehold.co/200x240?text=NA"
                    }
                    alt={cast.original_name}
                  />

                  <p>
                    {cast.original_name.length > 15
                      ? cast.original_name.substring(0, 15) + "..."
                      : cast.original_name}
                  </p>
                </div>
              )
            );
          })}

          {cast.length > 10 && (
            <Link to={`/movie/cast/${id}`} className="loadmore-div">
              <button>
                Load More <FaArrowCircleRight size={"32px"} />
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Trending Movies */}
      <div className="trending_movie_list">
        <h2 className="trending_list_title">Trending</h2>
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
    </div>
  );
};

export default MovieDetail;
