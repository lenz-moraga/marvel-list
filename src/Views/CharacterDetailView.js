import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";

import DetailedInfoSection from "../Components/Sections/DetailedInfoSection";

const CharacterDetailView = () => {
  const { charId } = useParams();
  const [charDetail, setCharDetail] = useState({});
  const [charUrl, setCharUrl] = useState([]);
  const [charStories, setCharStories] = useState([]);
  const [charComics, setCharComics] = useState([]);
  const saved = localStorage.getItem("items");
  const initialValue = JSON.parse(saved);
  const [quienes, setQuienes] = useState(initialValue || "");
  const endPointUrl = `${process.env.REACT_APP_ROOT_URL}/characters/${charId}?${process.env.REACT_APP_ROOT_KEY}`;

  useEffect(() => {
    axios
      .get(endPointUrl)
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
  }, [endPointUrl]);

  useEffect(() => {
    quienes && localStorage.setItem("items", JSON.stringify(quienes));
  }, [quienes]);

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

  const onAddClickHandler = () => {
    return setQuienes((prevState) => [charDetail, ...prevState]);
  };

  const onRemoveClickHandler = (evt) => {
    let {
      target: { value },
    } = evt;
    value = parseInt(value);
    // console.log(quienes.filter( quien => { return parseInt(quien.id) !== value } ));
    if (Array.isArray(quienes)) {
      setQuienes(quienes.filter((quien) => quien.id !== value));
    }
  };

  const renderCharInformation = () => {
    return (
      <>
        <h3>
          {charDetail.name}{" "}
          {quienes.findIndex((quien) => {
            return quien.id === charDetail.id;
          }) !== -1 ? (
            <button
              className="btn btn-warning"
              onClick={onRemoveClickHandler}
              value={charDetail.id}
            >
              remove
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={onAddClickHandler}
              value={charDetail.id}
            >
              add
            </button>
          )}
        </h3>
        <p className="text-start">
          {charDetail.description === ""
            ? (charDetail.description =
                "There is no description available for this character, visit the links below for more information...")
            : charDetail.description}
        </p>

        <div className="my-4">
          <h3>Comics</h3>
          <DetailedInfoSection information={charComics} />
        </div>

        <div>
          <h3>Stories</h3>
          <DetailedInfoSection information={charStories} />
        </div>

        <div>
          <h4 className="mt-4">
            Learn more about this Character in the following links
          </h4>
          <ul className="wiki-links">{renderCharWikiLinks()}</ul>
        </div>
      </>
    );
  };

  const renderCharWikiLinks = () => {
    return charUrl.map((url) => {
      return (
        <li>
          <span
          className="badge rounded-pill bg-primary m-1 p-2 text-capitalize"
          key={url.type}
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
