// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpotForm from "./components/CreateSpotForm"
import AllSpots from "./components/AllSpots";
import OneSpot from "./components/OneSpot";
import UserSpots from "./components/UserSpots/UserSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route exact path='/spots/:spotId'>
            <OneSpot />
          </Route>
          <Route path='/host'>
            <CreateSpotForm />
          </Route>
          <Route path='/account'>
            <UserSpots />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;