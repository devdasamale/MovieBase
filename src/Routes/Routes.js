import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
// import MovieList from "../components/MovieList/MovieList";
// import MovieDetail from "../pages/MovieDetail/MovieDetail";
// import Search from "../pages/Search/Search";
// import WatchList from "../pages/WatchList/WatchList";
// import Cast from "../components/Cast/Cast";
// import Genre from "../components/Genre/Genre";
const MovieList = lazy(() => import("../components/MovieList/MovieList"));
const MovieDetail = lazy(() => import("../pages/MovieDetail/MovieDetail"));
const Search = lazy(() => import("../pages/Search/Search"));
const WatchList = lazy(() => import("../pages/WatchList/WatchList"));
const Cast = lazy(() => import("../components/Cast/Cast"));
const Genre = lazy(() => import("../components/Genre/Genre"));

const Routes = () => {
  const users = useSelector((state) => state.movieInfo.users);
  const isLoggedIn = users.length > 0;
  let route = useRoutes([
    {
      index: true,
      element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "movie/:id",
      element: isLoggedIn ? <MovieDetail /> : <Navigate to="/login" />,
    },

    {
      path: "genre/:id",
      element: isLoggedIn ? <Genre /> : <Navigate to="/login" />,
    },
    {
      path: "movie/cast/:id",
      element: isLoggedIn ? <Cast /> : <Navigate to="/login" />,
    },
    {
      path: "movies/:type",
      element: isLoggedIn ? <MovieList /> : <Navigate to="/login" />,
    },
    {
      path: "/search",
      element: isLoggedIn ? <Search /> : <Navigate to="/login" />,
    },
    {
      path: "/watchlist",
      element: isLoggedIn ? <WatchList /> : <Navigate to="/login" />,
    },
    {
      path: "/*",
      element: <Navigate to={isLoggedIn ? "/" : "/login"} />,
    },
  ]);
  return route;
};

export default Routes;
