import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";
import Swal from "sweetalert2";

const Footer = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "ec3cee2d-51ac-47ca-a83d-599eb2377cd5");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully",
        icon: "success",
        width: "300px",
      });
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left Side - About, Quick Links, Socials */}
        <div className="footer-left">
          <h2 className="footer-heading">About Us</h2>
          <p className="footer-text">
            Welcome to MovieBase, your ultimate destination for discovering and
            exploring movies! Whether you're a casual viewer or a hardcore film
            enthusiast, our platform is designed to bring you the latest
            updates, reviews, and insights into the world of cinema.
          </p>

          <h2 className="footer-heading">Quick Links</h2>
          <ul className="quick-links">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/movies/popular"}>Popular</Link>
            </li>
            <li>
              <Link to={"/movies/top_rated"}>Top Rated</Link>
            </li>
            <li>
              <Link to={"/movies/upcoming"}>Upcoming</Link>
            </li>
            <li>
              <Link to={"/search"}>Search</Link>
            </li>
          </ul>

          <h2 className="footer-heading">Follow Me</h2>
          <ul className="social-icons">
            <li>
              <a
                href="https://www.instagram.com/ig_devdas/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram color="orange" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/devdasamale"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub color="darkmagenta" /> Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/devdas-amale-25b394170/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin color="blue" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Contact Form */}
        <div className="footer-right">
          <form onSubmit={onSubmit}>
            <h2>Contact Us</h2>
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                className="field"
                placeholder="Enter your name"
                required
                name="name"
              />
            </div>
            <div className="input-box">
              <label>Email Address</label>
              <input
                type="email"
                className="field"
                placeholder="Enter your email"
                required
                name="email"
              />
            </div>
            <div className="input-box">
              <label>Your Message</label>
              <textarea
                className="field mess"
                placeholder="Enter your message"
                required
                name="message"
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p style={{ fontSize: "14px" }}>
          &copy; All Rights Reserved | MovieBase
        </p>
      </div>
    </footer>
  );
};

export default Footer;
