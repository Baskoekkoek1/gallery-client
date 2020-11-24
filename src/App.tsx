import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
