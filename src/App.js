import './App.css';
import Rocket from './pages/rocket'
import Home from './pages/home'
import Launches from './pages/launches'
import LaunchDetail from './pages/launchDetail'
import Navbar from './component/Navbar';
import {
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <Route path="/rockets" component={Rocket}/>
      <Route path="/launches" component={Launches}/>
      <Route path="/launchDetail/:id" component={LaunchDetail}/>
    </div>

  );
}

export default App;
