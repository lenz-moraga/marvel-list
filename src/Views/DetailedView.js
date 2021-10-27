import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Link } from 'react-router-dom';

import DetailedInfoSection from '../Components/Sections/DetailedInfoSection';

const DetailedView = (props) => {
  const { charId } = useParams();

  const [itemDetail, setItemDetail] = useState({});
  const [itemUrl, setItemUrl] = useState([]);
  const [itemStories, setItemStories] = useState([]);
  const [itemComics, setItemComics] = useState([]);

  const saved = localStorage.getItem('items');
  const initialValue = JSON.parse(saved);
  const [favItemList, setFavItemList] = useState(initialValue || '');

  const ROOT = process.env.REACT_APP_ROOT_URL;
  const KEY = process.env.REACT_APP_ROOT_KEY;

  const endPointUrl = `${ROOT}/characters/${charId}?${KEY}`;

  const getAxiosResponse = useCallback(async (endPointUrl) => {
    return axios
      .get(endPointUrl)
      .then((res) => {
        const ItemToDisplayInfo = res.data.data.results[0];
        setItemDetail(ItemToDisplayInfo);
        setItemUrl(ItemToDisplayInfo.urls);
        setItemStories(ItemToDisplayInfo.stories.items);
        setItemComics(ItemToDisplayInfo.comics.items);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getAxiosResponse(endPointUrl);
  }, [getAxiosResponse, endPointUrl]);

  useEffect(() => {
    favItemList && localStorage.setItem('items', JSON.stringify(favItemList));
  }, [favItemList]);

  const renderImage = () => {
    return Object.entries(itemDetail).length === 0 ? (
      <img
        src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        className="img-thumbnail"
        alt=""
      ></img>
    ) : (
      <img
        src={`${itemDetail.thumbnail.path}.${itemDetail.thumbnail.extension}`}
        className="img-thumbnail"
        alt=""
      ></img>
    );
  };

  const onAddClickHandler = () => {
    return setFavItemList((prevState) => [itemDetail, ...prevState]);
  };

  const onRemoveClickHandler = (evt) => {
    let {
      target: { value },
    } = evt;
    value = parseInt(value);
    // console.log(quienes.filter( quien => { return parseInt(quien.id) !== value } ));
    if (Array.isArray(favItemList)) {
      setFavItemList(favItemList.filter((quien) => quien.id !== value));
    }
  };

  const renderCharInformation = () => {
    return (
      <Fragment>
        <h3>
          {itemDetail.name}{' '}
          {favItemList.findIndex((quien) => {
            return quien.id === itemDetail.id;
          }) !== -1 ? (
            <button
              className="btn btn-warning"
              onClick={onRemoveClickHandler}
              value={itemDetail.id}
            >
              remove
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={onAddClickHandler}
              value={itemDetail.id}
            >
              add
            </button>
          )}
        </h3>
        <p className="text-start">
          {itemDetail.description === ''
            ? (itemDetail.description =
                'There is no description available for this character, visit the links below for more information...')
            : itemDetail.description}
        </p>

        <div className="my-4">
          <h3>Comics</h3>
          <DetailedInfoSection information={itemComics} />
        </div>

        <div>
          <h3>Stories</h3>
          <DetailedInfoSection information={itemStories} />
        </div>

        <div>
          <h4 className="mt-4">
            Learn more about this Character in the following links
          </h4>
          <ul className="wiki-links">{renderCharWikiLinks()}</ul>
        </div>
      </Fragment>
    );
  };

  const renderCharWikiLinks = () => {
    return itemUrl.map((url) => {
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
    <Fragment>
      <div className="container my-4">
        <div className="row">
          <div className="col-4">{renderImage()}</div>
          <div className="col-8">{renderCharInformation()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailedView;
