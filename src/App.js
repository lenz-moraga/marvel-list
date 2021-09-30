import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';

import HomeView from './Views/HomeView';
import CharacterView from './Views/CharacterView';
import ComicsView from './Views/ComicsView';
import SearchResults from './Views/SearchResults';
import CharacterDetailView from './Views/CharacterDetailView';

import Navbar from './Components/Sections/Navbar';

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
        <Route path='/characters' exact>
          <CharacterView />
        </Route>
        <Route path='/characters/:charId'>
          <CharacterDetailView/>
        </Route>
        <Route path='/search/:searchparam'>
          <SearchResults/>
        </Route>
        <Route path='/comics' exact>
          <ComicsView />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
