import './_App.scss';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeView from './Views/HomeView';
import CharacterView from './Views/CharacterView';
import ComicsView from './Views/ComicsView';
import SearchResults from './Views/SearchResults';
import StoryDetailedView from './Views/StoryDetailedView';

import Navbar from './Components/Sections/Navbar';
import SearchBar from './Components/Sections/SearchBar';
import MyList from './Views/MyList';
import DetailedView from './Views/DetailedView';

function App() {
  return (
    <div className="App container">
      <Navbar brand={'Marvel'} />
      <SearchBar />

      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomeView />
        </Route>
        <Route path="/characters" exact>
          <CharacterView />
        </Route>
        <Route path="/characters/:Id">
          <DetailedView viewType="/characters/" />
        </Route>
        <Route path="/comics" exact>
          <ComicsView />
        </Route>
        <Route path="/comics/:Id">
          <DetailedView viewType="/comics/" />
        </Route>
        <Route path="/stories/:storyId">
          <StoryDetailedView />
        </Route>
        <Route path="/my-list">
          <MyList />
        </Route>
        <Route path="/search/:searchparam">
          <SearchResults />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
