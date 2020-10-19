import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CommonRoute from "./components/CommonRoute";

function App() {
  return (
    <Router>
      <Switch>
        <CommonRoute exact path="/" component={HomePage} />
        <CommonRoute exact path="/movie_detail/:id" component={DetailPage} />
        <Route path="*">
          <Redirect to={"/"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
