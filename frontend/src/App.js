// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpotForm from "./components/CreateSpotForm"
import AllSpots from "./components/AllSpots";
import SingleSpot from "./components/SingleSpot";
import UserSpots from "./components/UserSpots";
import UpdateSpotForm from "./components/UpdateSpotForm"
import CreateReviewForm from "./components/CreateReviewForm";
import UserReviews from "./components/UserReviews";
import UserBookings from "./components/UserBookings";

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
            <SingleSpot />
          </Route>
          <Route path='/host'>
            <CreateSpotForm />
          </Route>
          <Route path='/listings'>
            <UserSpots />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <UpdateSpotForm />
          </Route>
          <Route path='/spots/:spotId/review'>
            <CreateReviewForm />
          </Route>
          <Route path='/reviews'>
            <UserReviews />
          </Route>
          <Route path='/bookings'>
            <UserBookings />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;