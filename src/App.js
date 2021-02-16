import './App.css';
import Rocket from './pages/rocket'
import Home from './pages/home'
import Launches from './pages/launches'
import Navbar from './component/Navbar';
import {
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/rockets" component={Rocket}/>
      <Route path="/launches" component={Launches}/>
    </div>

  );
}

export default App;
