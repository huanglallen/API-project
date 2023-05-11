import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";

import SpotIndex from "./components/SpotIndex/SpotIndex";
import SpotShow from "./components/SpotShow/SpotShow";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/' component={SpotIndex} />
          <Route exact path='/spots/:spotId' component={SpotShow} />
          <Route exact path='/spots/new' component={CreateSpotForm} />
        </Switch>
        }
    </>
  );
}

export default App;
