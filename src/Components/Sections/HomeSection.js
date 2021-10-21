import axios from "axios";
import React, { useEffect, useState } from "react";

import Cards from "../Cards/Cards";
import Button from "../Buttons/Button";
// import { useParams } from 'react-router';

const HomeSection = (props) => {
  const [cardInformation, setCardInformation] = useState([]);
  const CHARACTER_SECTION_TYPE = 'charactersSection';
  const COMIC_SECTION_TYPE = 'comicsSection';

  // const dataArray = [data];
  // const dataArray1 = dataArray[0].data.results;
  // console.log(dataArray1);
  // script to pull from the json default file, if the Response request limit is reached

  const rootUrl = process.env.REACT_APP_ROOT_URL;
  const key = process.env.REACT_APP_ROOT_KEY;

  //   const apiUrl1 = 'https://gateway.marvel.com:443/v1/public/characters?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';
  const getCharactersUrl = `${rootUrl}/characters?${key}`;
  const getComicsUrl = `${rootUrl}/comics?${key}`;

  useEffect(() => {
    if (props.sectionType === CHARACTER_SECTION_TYPE) {
      axios
        .get(getCharactersUrl)
        .then((res) => {
          const transformedObject = res.data.data.results.map((cardData) => {
            return {
              id: cardData.id,
              name: cardData.name,
              desc: cardData.description,
              stories: cardData.stories,
              thumbnail: cardData.thumbnail,
              url: cardData.urls,
              from: "characterView",
              type: "character",
            };
          });
          setCardInformation(transformedObject);
        })
        .catch((error) => console.log(error));
    } else if (props.sectionType === COMIC_SECTION_TYPE) {
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
    }
  }, [getCharactersUrl, getComicsUrl, props.sectionType]);

  const renderCards = () => {
    return cardInformation.slice(0, 6).map((char) => {
      return <Cards values={char} key={char.id} />;
    });
  };

  return (
    <>
      <h2 className="my-4">{props.viewMoreValue}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {renderCards()}
        <Button
          buttonType={props.buttonType}
          value={`View More ${props.viewMoreValue}`}
          cssClasses="btn btn-primary mx-auto mt-3 mb-5"
        />
      </div>
    </>
  );
};

/* {
    dataArray1.map( (char) => {
        return <Cards values={char} key={char.id} />
    })
    // script to pull from the json default file, if the Response request limit is reached
} */

export default HomeSection;
