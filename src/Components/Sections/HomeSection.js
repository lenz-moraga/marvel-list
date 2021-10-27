import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import Button from "../Buttons/Button";

const CHARACTER_SECTION_TYPE = "charactersSection";
const COMIC_SECTION_TYPE = "comicsSection";
const rootUrl = process.env.REACT_APP_ROOT_URL;
const key = process.env.REACT_APP_ROOT_KEY;
const getCharactersUrl = `${rootUrl}/characters?${key}`;
const getComicsUrl = `${rootUrl}/comics?${key}`;

const HomeSection = (props) => {
  const [cardInformation, setCardInformation] = useState([]);

  const getCharacterInfo = (from, type, cardData) => {
    const { id, name, title, description, stories, thumbnail, urls } = cardData;
    return {
      id,
      name: name || title,
      desc: description,
      stories,
      thumbnail,
      url: urls,
      from,
      type,
    };
  };

  useEffect(() => {
    if (props.sectionType === CHARACTER_SECTION_TYPE) {
      axios
        .get(getCharactersUrl)
        .then((res) => {
          const transformedObject = res.data.data.results.map((cardData) => {
            return getCharacterInfo("characterView", "character", cardData);
          });
          setCardInformation(transformedObject);
        })
        .catch((error) => console.log(error));
    } else if (props.sectionType === COMIC_SECTION_TYPE) {
      axios
        .get(getComicsUrl)
        .then((res) => {
          const transformedObject = res.data.data.results.map((cardData) => {
            return getCharacterInfo("comicView", "comic", cardData);
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
