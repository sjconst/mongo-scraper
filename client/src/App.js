import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer";
import NavTab from "./Components/NavTab";
import Home from "./Pages/Home";
import Saved from "./Pages/Saved";
import NoMatch from "./Pages/NoMatch";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <NavTab />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Saved" component={Saved} />          
          <Route component={NoMatch} />
        </Switch>    
        <Footer />    
      </div>
    </Router>
  );
}

export default App;
