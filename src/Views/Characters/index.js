import axios from 'axios';
import React, { Fragment, useEffect, useState, useCallback } from 'react';

import Cards from '../../Components/Cards';

const CharacterView = () => {
  const [cardInformation, setCardInformation] = useState([]);
  const ROOT = process.env.REACT_APP_ROOT_URL;
  const KEY = process.env.REACT_APP_ROOT_KEY;
  const SECTION = 'characterView';

  const getCharactersUrl = `${ROOT}/characters?${KEY}`;

  const getCardInfo = (from, cardData) => {
    const { id, name, title, description, stories, thumbnail, urls } = cardData;
    return {
      id,
      stories,
      thumbnail,
      from,
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
            return getCardInfo(SECTION, cardData);
          });
          setCardInformation(transformedObject);
        })
        .catch((error) => console.log(error));
    },
    [SECTION]
  );

  useEffect(() => {
    getAxiosResponse(getCharactersUrl);
  }, [getCharactersUrl, getAxiosResponse]);

  const renderCharacterCards = () => {
    return cardInformation.map((char) => (
      <Cards values={char} key={char.id} from={SECTION} />
    ));
  };

  return (
    <Fragment>
      <h2 className="my-4">Characters</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {renderCharacterCards()}
      </div>
    </Fragment>
  );
};

export default CharacterView;
