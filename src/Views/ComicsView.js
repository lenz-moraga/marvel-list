import axios from "axios";
import React, { useEffect, useState } from "react";

import Cards from "../Components/Cards/Cards";

const ComicsView = () => {
  const [cardInformation, setCardInformation] = useState([]);
  const getComicsUrl = `${process.env.REACT_APP_ROOT_URL}/comics?${process.env.REACT_APP_ROOT_KEY}`;

  useEffect(() => {
    axios
      .get(getComicsUrl)
      .then((res) => {
        const transformedObject = res.data.data.results.map((cardData) => {
          return {
            id: cardData.id,
            name: cardData.title,
            desc: cardData.description,
            stories: cardData.stories,
            thumbnail: cardData.thumbnail,
            url: cardData.urls,
            from: "comicView",
            type: "comic",
          };
        });
        setCardInformation(transformedObject);
      })
      .catch((error) => console.log(error));
  }, [getComicsUrl]);

  const renderCards = () => {
    return cardInformation.map((char) => (
      <Cards values={char} key={char.id} from="comicView" />
    ));
  };

  return (
    <>
      <h2 className="my-4">Comics View</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">{renderCards()}</div>
    </>
  );
};

export default ComicsView;
