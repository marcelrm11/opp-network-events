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
  useEffect(() => {
    console.log("app use effect");
    fetchCurrentUser().then((res) =>
      console.log("app fetch current user:", res)
    );

    setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const onUserUpdate = (user) => {
    setCurrentUser(user);
    console.log("app current user:", user);
  };

  console.log("app state current user:", currentUser);
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
          <Route element={<Home user={currentUser} />} path="/" />
          <Route element={<UserDetails />} path="/user/:id" />
          <Route element={<EventDetails />} path="/event/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
