import React from 'react'
import './App.css';
import Rocket from './pages/rocket'
import Home from './pages/home'
import Launches from './pages/launches'
import LaunchDetail from './pages/launchDetail'
import RocketDetail from './pages/rocketDetail'
import Navbar from './component/Navbar';
import Error from './pages/404'
import {
  Route, Switch
} from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rockets" component={Rocket} />
        <Route path="/launches" component={Launches} />
        <Route path="/launchDetail/:id" component={LaunchDetail} />
        <Route path="/rocketDetail/:rocket_id" component={RocketDetail} />
        <Route path="*" component={Error} />
      </Switch>
    </div>

  );
}

export default App;
