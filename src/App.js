import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CommonRoute from "./components/CommonRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <CommonRoute exact path="/" component={HomePage} />
        <CommonRoute exact path="/movie_detail/:id" component={DetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
