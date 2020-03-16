import React from "react";
import "./App.css";
import logo from "./equal-experts.svg";
import { List } from "./List";

const App = () => (
  <div className="app">
    <header className="header">
      <img alt="Equal Experts" className="logo" src={logo} />
      <h1 className="title">Grocery List</h1>
    </header>
    <main className="main">
      <div className="list-container">
        <List />
      </div>
    </main>
  </div>
);

export default App;
