import React from 'react';
import SearchBar from "../Components/Sections/SearchBar";
import HomeSection from '../Components/Sections/HomeSection';

// import data from '../Jsons/AllCharacters.json';

const HomeView = () => {

  return (
    <>
        <SearchBar />

        <h2 className="my-4">Home View</h2>
        
        <HomeSection sectionType="charactersSection" buttonType="characterViewAll" viewMoreValue="View More Characters"/>
        <HomeSection sectionType="comicsSection" buttonType="comicViewAll" viewMoreValue="View More Comics"/>
    </>
  );
}

export default HomeView;
// cf5cf23a61ba45d6661053f6344efe78