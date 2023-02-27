import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../styles/App.css";
import { Header } from "../components/Header";
import { Home } from "./Home";
import { EventDetails } from "./EventDetails";
import { UserDetails } from "./UserDetails";
import { fetchCurrentUser } from "../functions/authentication";

// app that manages router, current user and authentication token
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  // user syncing with fetchUserData function (api call to auth/current_user)
  useEffect(() => {
    async function fetchUserData() {
      try {
        // console.log(token);
        await fetchCurrentUser(token);
        const storageUser = sessionStorage.getItem("user");
        if (storageUser === JSON.stringify({ msg: "no active session" })) {
          sessionStorage.removeItem("token");
        }
        setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
      } catch (e) {
        console.log(e);
      }
    }
    fetchUserData();
  }, [token]);

  // sync token in session storage
  useEffect(() => {
    setToken(JSON.parse(sessionStorage.getItem("token")));
  }, [currentUser]);

  const onUserUpdate = (user) => {
    setCurrentUser(user);
    // console.log("app user update:", user);
  };

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Header
          color={currentUser?.is_superuser ? "primary" : "dark"}
          dark
          expand="md"
          container="md"
          user={currentUser}
          token={token}
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
