import React from "react";
import { Link } from "react-router-dom";

const DetailedInfoSection = (props) => {
  const COMIC_URL_TYPE = "/comics/";
  const STORIES_URL_TYPE = "/stories/";
  const CHARACTERS_URL_TYPE = "/characters/";

  const renderBadges = () => {
    return props.information.slice(0, 10).map((badge) => {
      const badgeUrl = badge.resourceURI.includes(COMIC_URL_TYPE)
        ? `${COMIC_URL_TYPE}${badge.resourceURI.split(COMIC_URL_TYPE)[1]}`
        : badge.resourceURI.includes(STORIES_URL_TYPE)
        ? `${STORIES_URL_TYPE}${badge.resourceURI.split(STORIES_URL_TYPE)[1]}`
        : `${CHARACTERS_URL_TYPE}${
            badge.resourceURI.split(CHARACTERS_URL_TYPE)[1]
          }`;

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
      {renderBadges().length ? renderBadges() : <p> No information found. </p>}
    </>
  );
};

export default DetailedInfoSection;
