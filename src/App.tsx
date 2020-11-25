import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Navigation from "./components";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
