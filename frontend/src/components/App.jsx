import { useState } from "react";
import reactLogo from "../assets/react.svg";
import "../styles/App.css";
import { Header } from "./Header";

function App() {
  return (
    <div className="App">
      <Header color="dark" dark expand="md" container="md" />
    </div>
  );
}

export default App;
