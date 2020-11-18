import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Albums = lazy(() => import("./pages/Albums"));
const Photos = lazy(() => import("./pages/Photos"));

export default function Routes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Albums} />
          <Route exact path="/album" component={Photos} />
          <Route component={Albums} />
        </Switch>
      </Suspense>
    </Router>
  );
}
