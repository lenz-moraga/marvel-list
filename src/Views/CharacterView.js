import axios from "axios";
import React, { useEffect, useState } from "react";

import Cards from "../Components/Cards/Cards";

const CharacterView = () => {
  const [cardInformation, setCardInformation] = useState([]);

  const getCharactersUrl = `${process.env.REACT_APP_ROOT_URL}/characters?${process.env.REACT_APP_ROOT_KEY}`;

  useEffect(() => {
    axios
      .get(getCharactersUrl)
      .then((res) => {
        const transformedObject = res.data.data.results.map((cardData) => {
          return {
            id: cardData.id,
            name: cardData.name,
            desc: cardData.description,
            thumbnail: cardData.thumbnail,
            comics: cardData.comics,
            series: cardData.series,
            stories: cardData.stories,
            events: cardData.events,
            urls: cardData.urls,
            from: "characterView",
          };
        });

        setCardInformation(transformedObject);
      })
      .catch((error) => console.log(error));
  }, [getCharactersUrl]);

  const renderCharacterCards = () => {
    return cardInformation.map((char) => (
      <Cards values={char} key={char.id} from="characterView" />
    ));
  };

  return (
    <>
      <h2 className="my-4">Characters</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {renderCharacterCards()}
      </div>
    </>
  );
};

export default CharacterView;
