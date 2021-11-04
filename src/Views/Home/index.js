import React, { Fragment } from 'react';
import HomeSection from '../../Sections/Home';

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
