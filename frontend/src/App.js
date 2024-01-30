import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import all components
// import Login from "./components/Login";
import Login from "./pages/auth/login";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<Recovery />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
