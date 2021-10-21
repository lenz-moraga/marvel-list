import React from "react";
import { Link } from "react-router-dom";

const DetailedInfoSection = (props) => {
  const COMIC_URL_TYPE = "/comics/";
  const STORIES_URL_TYPE = "/stories/";

  const renderBadges = () => {
    return props.information.slice(0, 10).map((badge) => {
      const badgeUrl = badge.resourceURI.includes(COMIC_URL_TYPE)
        ? `${COMIC_URL_TYPE}${badge.resourceURI.split(COMIC_URL_TYPE)[1]}`
        : `${STORIES_URL_TYPE}${badge.resourceURI.split(STORIES_URL_TYPE)[1]}`;

      return (
        <span
          className="badge rounded-pill bg-primary m-1 p-2"
          key={badge.name}
        >
          <Link
            to={badgeUrl}
            className="text-light text-decoration-none text-capitalize"
            target="_blank"
          >
            {badge.name}
          </Link>
        </span>
      );
    });
  };

  return <>{renderBadges()}</>;
};

export default DetailedInfoSection;
