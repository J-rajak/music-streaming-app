import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import all components
// import Login from "./components/Login";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

import "./index.css";

const App = () => {
  return (
    <>
      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/password" element={<Password />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password" element={<Recovery />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
