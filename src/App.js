import "./App.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomeView from "./Views/HomeView";
import CharacterView from "./Views/CharacterView";
import ComicsView from "./Views/ComicsView";
import SearchResults from "./Views/SearchResults";
import CharacterDetailView from "./Views/CharacterDetailView";
import ComicDetailView from "./Views/ComicDetailView";
import StoryDetailedView from "./Views/StoryDetailedView";

import Navbar from "./Components/Sections/Navbar";
import SearchBar from "./Components/Sections/SearchBar";
import MyList from "./Views/MyList";

function App() {
  return (
    <div className="App container">
      <Navbar brand={"Marvel"} />
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
        <Route path="/characters/:charId">
          <CharacterDetailView />
        </Route>
        <Route path="/comics" exact>
          <ComicsView />
        </Route>
        <Route path="/comics/:comicId">
          <ComicDetailView />
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
