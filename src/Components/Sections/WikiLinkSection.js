import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const WikiLinkSection = (props) => {
  const {links} = props;
  const renderCharWikiLinks = () => {
    return links.map((url) => {
      return (
        <li 
        key={url.type}>
          <span
            className="badge rounded-pill bg-primary m-1 p-2 text-capitalize"
          >
            <Link
              to={{ pathname: url.url }}
              target="_blank"
              rel="noreferrer"
              className="text-light text-decoration-none text-capitalize"
            >
              {url.type}
            </Link>
          </span>
        </li>
      );
    });
  };

  return (
    <Fragment>
      <h4 className="mt-4">
        Learn more about this Character in the following links
      </h4>
      <ul className="wiki-links">{renderCharWikiLinks()}</ul>
    </Fragment>
  );
};

export default WikiLinkSection;
