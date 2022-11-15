// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignupForm from "./components/SignupFormModal/SignupForm";
import CreateSpotForm from "./components/CreateSpotForm"
import AllSpots from "./components/AllSpots";

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
          <AllSpots />
          {/* <Route path="/signup">
            <SignupForm />
          </Route> */}
          {/* <Route path="/spots/new">
            <CreateSpotForm /> */}
          {/* </Route> */}
        </Switch>
      )
      }
    </>
  );
}

export default App;