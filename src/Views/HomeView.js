import React, { Fragment } from 'react';
import HomeSection from '../Components/Sections/HomeSection';

const HomeView = () => {
  return (
    <Fragment>
      <HomeSection
        forSection="characterView"
        type="character"
        buttonType="characterViewAll"
        viewMoreValue="Characters"
      />
      <HomeSection
        forSection="comicView"
        type="comic"
        buttonType="comicViewAll"
        viewMoreValue="Comics"
      />
    </Fragment>
  );
};

export default HomeView;
