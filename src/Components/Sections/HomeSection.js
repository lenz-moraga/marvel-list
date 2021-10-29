import axios from 'axios';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import Button from "../Button";

const HomeSection = (props) => {
  const CHARACTER_SECTION_TYPE = 'characterView';
  const COMIC_SECTION_TYPE = 'comicView';
  const rootUrl = process.env.REACT_APP_ROOT_URL;
  const key = process.env.REACT_APP_ROOT_KEY;

  const getCharactersUrl = `${rootUrl}/characters?${key}`;
  const getComicsUrl = `${rootUrl}/comics?${key}`;

  const [cardInformation, setCardInformation] = useState([]);
  const { forSection, type, viewMoreValue, buttonType } = props;

  const getCardInfo = (from, type, cardData) => {
    const { id, name, title, description, stories, thumbnail, urls } = cardData;
    return {
      id,
      stories,
      thumbnail,
      from,
      type,
      name: name || title,
      desc: description,
      url: urls,
    };
  };

  const getAxiosResponse = useCallback(
    async (endPointUrl) => {
      return axios
        .get(endPointUrl)
        .then((res) => {
          const transformedObject = res.data.data.results.map((cardData) => {
            return getCardInfo(forSection, type, cardData);
          });
          setCardInformation(transformedObject);
        })
        .catch((error) => console.log(error));
    },
    [forSection, type]
  );

  useEffect(() => {
    let endPoint = '';

    if (forSection === CHARACTER_SECTION_TYPE) endPoint = getCharactersUrl;
    else if (forSection === COMIC_SECTION_TYPE) endPoint = getComicsUrl;

    getAxiosResponse(endPoint);
  }, [getCharactersUrl, getComicsUrl, forSection, getAxiosResponse]);

  const renderCards = () => {
    return cardInformation.slice(0, 6).map((char) => {
      return <Cards values={char} key={char.id} />;
    });
  };

  return (
    <Fragment>
      <h2 className="my-4">{viewMoreValue}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {renderCards()}
        <Button
          buttonType={buttonType}
          value={`View More ${viewMoreValue}`}
          cssClasses="btn btn-primary mx-auto mt-3 mb-5"
        />
      </div>
    </Fragment>
  );
};

export default HomeSection;
