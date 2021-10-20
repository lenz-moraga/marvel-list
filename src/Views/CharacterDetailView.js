import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CharacterDetailView = () => {
  const { charId } = useParams();
  const [charDetail, setCharDetail] = useState({});
  const [charUrl, setCharUrl] = useState([]);
  const [charStories, setCharStories] = useState([]);
  const [charComics, setCharComics] = useState([]);

  const apiUrl1 = `${process.env.REACT_APP_ROOT_URL}/characters/${charId}?${process.env.REACT_APP_ROOT_KEY}`;

  useEffect(() => {
    axios
      .get(apiUrl1)
      .then(function (response) {
        const characterInfo = response.data.data.results[0];
        setCharDetail(characterInfo);
        setCharUrl(characterInfo.urls);
        setCharStories(characterInfo.stories.items);
        setCharComics(characterInfo.comics.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apiUrl1]);

  const renderImage = () => {
    return Object.entries(charDetail).length === 0 ? (
      <img
        src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        className="img-thumbnail"
        alt=""
      ></img>
    ) : (
      <img
        src={`${charDetail.thumbnail.path}.${charDetail.thumbnail.extension}`}
        className="img-thumbnail"
        alt=""
      ></img>
    );
  };

  const renderCharInformation = () => {
    return (
      <>
        <h3>{charDetail.name}</h3>
        <p className="text-start">
          {charDetail.description === ""
            ? (charDetail.description =
                "There is no description available for this character, visit the links below for more information...")
            : charDetail.description}
        </p>

        <div className="my-4">
          <h3>Comics</h3>
          {renderCharComics()}
        </div>

        <div>
          <h3>Stories</h3>
          {renderCharStories()}
        </div>

        <div>
          <ul>
            <h4 className="mt-4">
              Learn more about this Character in the following links
            </h4>
            {renderCharWikiLinks()}
          </ul>
        </div>
      </>
    );
  };

  const renderCharComics = () => {
    return charComics.slice(0, 10).map((comic) => {
      return (
        <span
          className="badge rounded-pill bg-primary m-1 p-2"
          key={comic.name}
        >
          <a
            className="text-light text-decoration-none text-capitalize"
            href={comic.resourceURI}
            target="_blank"
            rel="noreferrer"
          >
            {comic.name}
          </a>
        </span>
      );
    });
  };

  const renderCharStories = () => {
    return charStories.slice(0, 10).map((story) => {
      return (
        <span
          className="badge rounded-pill bg-primary m-1 p-2"
          key={story.name}
        >
          <a
            className="text-light text-decoration-none text-capitalize"
            href={story.resourceURI}
            target="_blank"
            rel="noreferrer"
          >
            {story.name}
          </a>
        </span>
      );
    });
  };

  const renderCharWikiLinks = () => {
    return charUrl.map((url) => {
      return (
        <li className="text-start text-capitalize" key={url.type}>
          {" "}
          <a href={url.url} target="_blank" rel="noreferrer">
            {" "}
            {url.type}{" "}
          </a>
        </li>
      );
    });
  };

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-4">{renderImage()}</div>
          <div className="col-8">{renderCharInformation()}</div>
        </div>
      </div>
    </>
  );
};

export default CharacterDetailView;
