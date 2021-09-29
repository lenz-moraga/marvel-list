import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomeView from './Views/HomeView';
import CharacterView from './Views/CharacterView';
import Navbar from './Components/Navbar';
import CharacterDetailView from './Views/CharacterDetailView';

function App() {  

  return (
    <div className='App container'>
      <Navbar brand={'Marvel'}/>

      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home' > 
          <HomeView />
        </Route>
        <Route path='/characters'>
          <CharacterView />
        </Route>
        <Route path='/character/:charId'>
          <CharacterDetailView/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
