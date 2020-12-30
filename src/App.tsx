import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "../src/pages/SignUp";
import Login from "../src/pages/Login";
import Navigation from "./components";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import artistPage from "./pages/artistPage";
import Artwork from "./pages/artworkPage";
import Galleries from "./pages/Galleries";
import Gallery from "./pages/Gallery";
import MyGallery from "./pages/MyGallery/MyGallery";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "./store/user/actions";
import "./customRoot.scss";
import { selectAppLoading } from "./store/appState/selectors";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/artists/:name" component={artistPage} />
        <Route path="/artists" component={Artists} />
        <Route path="/artwork/:id" component={Artwork} />
        <Route path="/galleries/:id" component={Gallery} />
        <Route exact path="/galleries" component={Galleries} />
        <Route path="/mygallery" component={MyGallery} />
      </Switch>
    </div>
  );
}

export default App;
