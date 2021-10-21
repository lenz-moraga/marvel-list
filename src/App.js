import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';

import HomeView from './Views/HomeView';
import CharacterView from './Views/CharacterView';
import ComicsView from './Views/ComicsView';
import SearchResults from './Views/SearchResults';
import CharacterDetailView from './Views/CharacterDetailView';
import ComicDetailView from './Views/ComicDetailView';

import Navbar from './Components/Sections/Navbar';
import SearchBar from './Components/Sections/SearchBar';
import React from 'react';

function App() {  

  return (
    <div className='App container'>
      <Navbar brand={'Marvel'}/>
      <SearchBar />

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
        <Route path='/comics' exact>
          <ComicsView />
        </Route>
        <Route path='/comics/:comicId'>
          <ComicDetailView />
        </Route>
        <Route path='/search/:searchparam'>
          <SearchResults />
        </Route>        
      </Switch>
    </div>
  );
}

export default App;
