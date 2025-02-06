import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Cast.css";
import { IoMdArrowRoundBack } from "react-icons/io";

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        );
        const result = await response.json();
        setCast(result.cast || []);
        setCrew(result.crew || []);
      } catch (error) {
        console.error("Error fetching cast data:", error);
      }
    };
    fetchCast();
  }, [id]);

  return (
    <div className="cast-container">
      <div className="back" onClick={(e) => navigate(-1)}>
        <IoMdArrowRoundBack fontSize={"32px"} />
      </div>
      <h1>Movie Cast</h1>
      <div className="cast-list">
        {cast.slice(0, 25).map((castMember, i) => {
          return (
            castMember.profile_path && (
              <div className="cast" key={castMember.id}>
                <img
                  src={
                    castMember.profile_path
                      ? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
                      : "https://placehold.co/200x240?text=NA"
                  }
                  alt={castMember.original_name}
                  loading="lazy"
                />
                <p>
                  {castMember.original_name.length > 15
                    ? castMember.original_name.substring(0, 15) + "..."
                    : castMember.original_name}
                </p>
              </div>
            )
          );
        })}
      </div>
      <h1>Movie Crew</h1>
      <div className="cast-list">
        {crew.slice(0, 25).map((crewMember, i) => {
          return (
            crewMember.profile_path && (
              <div className="cast" key={crewMember.id}>
                <img
                  src={
                    crewMember.profile_path
                      ? `https://image.tmdb.org/t/p/w200${crewMember.profile_path}`
                      : "https://placehold.co/200x240?text=NA"
                  }
                  alt={crewMember.original_name}
                  loading="lazy"
                />
                <p>
                  {crewMember.original_name.length > 15
                    ? crewMember.original_name.substring(0, 15) + "..."
                    : crewMember.original_name}
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Cast;
