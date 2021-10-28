import React from 'react';
import { Link } from 'react-router-dom';

const DetailedInfoSection = (props) => {
  const COMIC_URL_TYPE = '/comics/';
  const STORIES_URL_TYPE = '/stories/';
  const CHARACTERS_URL_TYPE = '/characters/';

  const { information, sectionName } = props;

  const getBadgeUrl = (url) => {
    let badgeUrl = '';
    if (url.includes(COMIC_URL_TYPE)) {
      return (badgeUrl = `${COMIC_URL_TYPE}${url.split(COMIC_URL_TYPE)[1]}`);
    } else if (url.includes(STORIES_URL_TYPE)) {
      return (badgeUrl = `${STORIES_URL_TYPE}${
        url.split(STORIES_URL_TYPE)[1]
      }`);
    } else if (url.includes(CHARACTERS_URL_TYPE)) {
      return (badgeUrl = `${CHARACTERS_URL_TYPE}${
        url.split(CHARACTERS_URL_TYPE)[1]
      }`);
    }

    return badgeUrl;
  };

  const renderBadges = () => {
    return information.slice(0, 10).map((badge) => {
      const badgeUrl = getBadgeUrl(badge.resourceURI);

      return (
        <span
          className="badge rounded-pill bg-primary m-1 p-2"
          key={badge.resourceURI}
        >
          <Link
            to={badgeUrl}
            className="text-light text-decoration-none text-capitalize"
          >
            {badge.name}
          </Link>
        </span>
      );
    });
  };

  return (
    <>
      <h3>{sectionName}</h3>
      {renderBadges().length ? renderBadges() : <p> No information found. </p>}
    </>
  );
};

export default DetailedInfoSection;
