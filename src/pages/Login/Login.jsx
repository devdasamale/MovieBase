import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/movieSlice";
import { IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(addUser(username));
      setIsLoading(true);
      navigate("/");
    } else {
      Swal.fire({
        title: "Oops..",
        text: "Login to get access",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="main-div-login">
          <h1>
            Movie<span>Base</span>
          </h1>
          <h2>Unlimited movies info and many more</h2>
          <p>Your One-Stop Destination for All Movie Info!</p>

          <div className="login-form-div">
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Processing..." : "Get Started"}
              <IoIosArrowForward fontWeight={"bold"} size={"22px"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
