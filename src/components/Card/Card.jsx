import React, { useEffect, useState } from "react";
import "./Card.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { addMovies, removeMovie } from "../../Store/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ movie }) => {
  const dispatch = useDispatch();
  const watchListMovies = useSelector((state) => state.movieInfo.watchList);
  const [isLoading, setIsLoading] = useState(true);
  const [watchListClicked, setWatchListClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  let handleWatchList = () => {
    const isMovieInWatchList = watchListMovies.some((m) => m.id === movie.id);
    if (!isMovieInWatchList) {
      dispatch(addMovies(movie)); // Add movie to the watch list
      setWatchListClicked(true);
    } else {
      dispatch(removeMovie(movie.id));
      setWatchListClicked(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={350} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        // Card Code
        <div className="cards">
          <div className="watch-list-card" onClick={handleWatchList}>
            <span>
              <i
                id="watch-list-card-i"
                className={
                  watchListClicked ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }
              ></i>
            </span>
          </div>

          <Link to={`/movie/${movie.id}`}>
            <img
              className="card_img"
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
              alt=""
              loading="lazy"
            />

            <div className="card_overlay">
              <div className="card_title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="card_runtime">
                {movie ? movie.release_date : ""}
                <span className="card_rating">
                  {movie ? movie.vote_average : ""}{" "}
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="card_description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Card;
