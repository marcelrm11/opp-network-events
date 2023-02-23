import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../styles/App.css";
import { Header } from "./Header";
import { Home } from "./Home";
import { Details } from "./Details";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Header color="dark" dark expand="md" container="md" />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Details />} path="/user" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
