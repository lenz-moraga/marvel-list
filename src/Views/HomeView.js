import React from 'react';
import HomeSection from '../Components/Sections/HomeSection';

const HomeView = () => {

  return (
    <>        
        <HomeSection sectionType="charactersSection" buttonType="characterViewAll" viewMoreValue="Characters"/>
        <HomeSection sectionType="comicsSection" buttonType="comicViewAll" viewMoreValue="Comics"/>
    </>
  );
}

export default HomeView;