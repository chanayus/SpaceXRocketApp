import './App.css';
import Rocket from './pages/rocket'
import Navbar from './component/Navbar'

function App() {
  return (
    <div className="container">
      <Navbar/>
      <h2>SpaceX center</h2>
      <hr/>
      <Rocket/>
    </div>
  );
}

export default App;
