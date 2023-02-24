import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../styles/App.css";
import { Header } from "./Header";
import { Home } from "./Home";
import { EventDetails } from "./EventDetails";
import { UserDetails } from "./UserDetails";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Header color="dark" dark expand="md" container="md" />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<UserDetails />} path="/user/:id" />
          <Route element={<EventDetails />} path="/event/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
