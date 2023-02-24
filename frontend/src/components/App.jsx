import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../styles/App.css";
import { Header } from "./Header";
import { Home } from "./Home";
import { EventDetails } from "./EventDetails";
import { UserDetails } from "./UserDetails";
import { fetchCurrentUser } from "../functions/authentication";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  useEffect(() => {
    // console.log("app use effect");
    fetchCurrentUser();
    // .then((res) =>
    // console.log("app fetch current user:", res)
    // );
    setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);
  useEffect(() => {
    setToken(JSON.parse(sessionStorage.getItem("token")));
    // console.log("token in storage:", sessionStorage.getItem("token"));
  }, []);

  const onUserUpdate = (user) => {
    setCurrentUser(user);
    // console.log("app current user:", user);
  };

  // console.log("app state current user:", currentUser);
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Header
          color="dark"
          dark
          expand="md"
          container="md"
          user={currentUser}
          onUserUpdate={onUserUpdate}
        />
        <Routes>
          <Route element={<Home user={currentUser} token={token} />} path="/" />
          <Route
            element={<UserDetails user={currentUser} token={token} />}
            path="/user/:id"
          />
          <Route
            element={<EventDetails user={currentUser} token={token} />}
            path="/event/:id"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
