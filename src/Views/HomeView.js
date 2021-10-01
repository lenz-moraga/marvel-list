import React from 'react';
import SearchBar from "../Components/Sections/SearchBar";
import HomeSection from '../Components/Sections/HomeSection';

// import data from '../Jsons/AllCharacters.json';

const HomeView = () => {

  return (
    <>
        <SearchBar />
        
        <HomeSection sectionType="charactersSection" buttonType="characterViewAll" viewMoreValue="Characters"/>
        <HomeSection sectionType="comicsSection" buttonType="comicViewAll" viewMoreValue="Comics"/>
    </>
  );
}

export default HomeView;
// cf5cf23a61ba45d6661053f6344efe78