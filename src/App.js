import './Assets/Styles/_App.scss';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeView from './Views/Home';
import CharacterView from './Views/Characters';
import ComicsView from './Views/Comics';
import SearchResults from './Views/SearchResults';
import StoryDetailedView from './Views/Story';

import NavigationBar from './Sections/NavigationBar';
import SearchBar from './Sections/SearchBar';
import MyList from './Views/MyList';
import DetailedView from './Views/Detail';

function App() {
  return (
    <div className="App container">
      <NavigationBar brand={'Marvel'} />
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
