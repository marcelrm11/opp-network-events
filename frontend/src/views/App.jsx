import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../styles/App.css";
import { Header } from "../components/Header";
import { Home } from "./Home";
import { EventDetails } from "./EventDetails";
import { UserDetails } from "./UserDetails";
import { fetchCurrentUser } from "../functions/authentication";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  // const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchCurrentUser(token);
    const storageUser = sessionStorage.getItem("user");
    if (storageUser === JSON.stringify({ msg: "no active session" })) {
      sessionStorage.removeItem("token");
    }
    setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
  }, [token]);

  useEffect(() => {
    setToken(JSON.parse(sessionStorage.getItem("token")));
  }, [currentUser]);

  const onUserUpdate = (user) => {
    setCurrentUser(user);
    console.log("app user update:", user);
  };

  const onNewEvent = () => {
    async function fetchData() {
      let headers = {};
      if (token) {
        headers = {
          Authorization: `Token ${token}`,
        };
      }
      const response = await fetch(url, {
        headers: headers,
      });
      const data = await response.json();
      setEvents(data);
    }
    fetchData();
  };

  // const url = "http://localhost:8000/events/" + "events/";
  // useEffect(() => {
  //   async function fetchData() {
  //     let headers = {};
  //     if (token) {
  //       headers = {
  //         Authorization: `Token ${token}`,
  //       };
  //     }
  //     const response = await fetch(url, {
  //       headers: headers,
  //     });
  //     const data = await response.json();
  //     setEvents(data);
  //   }
  //   fetchData();
  // }, [token, currentUser]);
  // console.log(user);

  // console.log("app state current user:", currentUser);
  // console.log("app state current token:", token);
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
          onNewEvent={onNewEvent}
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
