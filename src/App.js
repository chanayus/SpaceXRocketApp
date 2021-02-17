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
<<<<<<< HEAD
      <Route path="/rockets" component={Rocket}/>
      <Route path="/launches" component={Launches}/>
      <Route path="/launchDetail/:id" component={LaunchDetail}/>
      <Route path="/rocketDetail/:rocket_id" component={RocketDetail}/>
=======
      <Route path="/SpaceXRocketApp/rockets" component={Rocket}/>
      <Route path="/SpaceXRocketApp/launches" component={Launches}/>
      <Route path="/SpaceXRocketApp/launchDetail/:id" component={LaunchDetail}/>
>>>>>>> 55adab59eb75f344da69455cfb3e4ce635ddaeed
    </div>

  );
}

export default App;
