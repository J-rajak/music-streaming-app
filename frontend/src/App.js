import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import songContext from "./contexts/songContext";
// import all components
// import Login from "./components/Login";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Home from "./pages/LoggedInHome";
import UploadSong from "./pages/UploadSong";
import SearchPage from "./pages/SearchPage";
import MyMusic from "./pages/MyMusic";
import "./index.css";

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [ isPaused, setIsPaused ] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie);
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          //logged in routes

          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}

          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/home" />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </songContext.Provider>
        ) : (
          //logged out routes
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
