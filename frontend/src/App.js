import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";

import SpotIndex from "./components/SpotIndex/SpotIndex";
import SpotShow from "./components/SpotShow/SpotShow";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="appWrapper">
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/' component={SpotIndex} />
          <Route exact path='/spots/new' component={CreateSpotForm} />
          <Route exact path='/spots/current' component={ManageSpots} />
          <Route exact path='/spots/:spotId/edit' component={UpdateSpot}/>
          <Route exact path='/spots/:spotId' component={SpotShow} />
        </Switch>
        }
    </div>
  );
}

export default App;
