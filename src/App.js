import './App.css';
import Rocket from './pages/rocket'
import Home from './pages/home'
import Launches from './pages/launches'
import LaunchDetail from './pages/launchDetail'
import RocketDetail from './pages/rocketDetail'
import Navbar from './component/Navbar';
import {
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>
      <Route exact path="/SpaceXRocketApp" component={Home}/>
      <Route path="/SpaceXRocketApp/rockets" component={Rocket}/>
      <Route path="/SpaceXRocketApp/launches" component={Launches}/>
      <Route path="/SpaceXRocketApp/launchDetail/:id" component={LaunchDetail}/>
      <Route path="/SpaceXRocketApp/rocketDetail/:rocket_id" component={RocketDetail}/>
    </div>

  );
}

export default App;
