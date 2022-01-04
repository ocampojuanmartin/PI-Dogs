import './App.css';
import { Route , Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate'
import Detail from './components/Details';
import NavBar from './components/NavBar';


function App() {
  return (
    
    <div className="App">
      <Route exact path='/' component={NavBar}/>
      <Route exact path='/dogs/:id' component={NavBar}/> 
      <Route exact path='/home' component={NavBar}/>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/dog' component={DogCreate}/>
      <Route exact path='/dogs/:id' component={Detail}/> 
      
      
    </div>
    
  );
}

export default App;
