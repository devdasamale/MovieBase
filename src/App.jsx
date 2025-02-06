import React, { Suspense } from "react";
import Routes from "./Routes/Routes.js";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";

const App = () => {
  const users = useSelector((state) => state.movieInfo.users);
  return (
    <>
      {users.length > 0 && <Header />}
      <Suspense>
        <Routes>
          {users.length > 0 ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </Suspense>
      {users.length > 0 && <Footer />}
    </>
  );
};

export default App;
