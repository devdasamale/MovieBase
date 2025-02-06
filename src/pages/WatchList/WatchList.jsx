import React from "react";
import "./WatchList.css";
import { useDispatch, useSelector } from "react-redux";
import { clearMovies, removeMovie } from "../../Store/movieSlice";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const WatchList = () => {
  const dispatch = useDispatch();
  const watchListMovies = useSelector((state) => state.movieInfo.watchList);
  const navigate = useNavigate();

  let deleteMovieFromWatchList = (id) => {
    dispatch(removeMovie(id));
    toast.success("Movie Removed from Watch List", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      className: "custom-toast",
    });
  };

  let clearWatchList = () => {
    dispatch(clearMovies());
    toast.success("Watch List Clear 🗑️", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      className: "custom-toast",
    });
  };

  return (
    <div className="watch-list-container">
      <span className="back-btn" onClick={(e) => navigate(-1)}>
        <i class="fa-solid fa-arrow-left"></i>
      </span>

      <h1 style={{ marginBottom: "20px" }}>Watch List</h1>
      <div
        className={
          watchListMovies.length > 0
            ? "watch-list-sub-container"
            : "watch-list-sub-container-empty"
        }
      >
        <div
          className={
            watchListMovies.length > 0
              ? "clear-watchlist-button"
              : "clear-watchlist"
          }
          onClick={clearWatchList}
        >
          {watchListMovies.length > 0 ? (
            <button className="button" type="button">
              <span className="button__text">Clear</span>
              <span className="button__icon">
                <svg
                  className="svg"
                  height="512"
                  viewBox="0 0 512 512"
                  width="512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title></title>
                  <path
                    d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                    style={{
                      fill: "none",
                      stroke: "#fff",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "32px",
                    }}
                  ></path>
                  <line
                    style={{
                      stroke: "#fff",
                      strokeLinecap: "round",
                      strokeMiterlimit: 10,
                      strokeWidth: "32px",
                    }}
                    x1="80"
                    x2="432"
                    y1="112"
                    y2="112"
                  ></line>
                  <path
                    d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                    style={{
                      fill: "none",
                      stroke: "#fff",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "32px",
                    }}
                  ></path>
                  <line
                    style={{
                      fill: "none",
                      stroke: "#fff",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "32px",
                    }}
                    x1="256"
                    x2="256"
                    y1="176"
                    y2="400"
                  ></line>
                  <line
                    style={{
                      fill: "none",
                      stroke: "#fff",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "32px",
                    }}
                    x1="184"
                    x2="192"
                    y1="176"
                    y2="400"
                  ></line>
                  <line
                    style={{
                      fill: "none",
                      stroke: "#fff",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "32px",
                    }}
                    x1="328"
                    x2="320"
                    y1="176"
                    y2="400"
                  ></line>
                </svg>
              </span>
            </button>
          ) : (
            <p>Your Watch List is Empty!!!!</p>
          )}
        </div>

        <div className="movie-div">
          {watchListMovies.map((movie, i) => {
            const {
              original_title,
              poster_path,
              tagline,
              vote_average,
              vote_count,
              overview,
            } = movie;
            return (
              <div className="movie-watchlist-div" key={movie.id}>
                <div className="img-div">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="data-div">
                  <h1>{original_title}</h1>
                  <h2>{tagline}</h2>

                  <div className="ratings-div">
                    <span>
                      {vote_average} <i class="fa-solid fa-star"></i>
                    </span>{" "}
                    <span>( {vote_count} )</span>
                  </div>
                  <p>{movie.release_date}</p>

                  <p>{overview.slice(0, 200)}...</p>
                </div>
                <div className="remove-item-div">
                  <button
                    class="btn"
                    onClick={(e) => deleteMovieFromWatchList(movie.id)}
                  >
                    <svg
                      viewBox="0 0 15 17.5"
                      height="17.5"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon"
                    >
                      <path
                        transform="translate(-2.5 -1.25)"
                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                        id="Fill"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
