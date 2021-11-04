import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DetailedInfoSection from '../../Sections/DetailedInformation';
import ImageSection from '../../Sections/Image';
import WikiLinkSection from '../../Sections/WikiLinks';

const DetailedView = (props) => {
  const { Id } = useParams();
  const { viewType } = props;

  const [itemDetail, setItemDetail] = useState([]);
  const [itemUrl, setItemUrl] = useState([]);
  const [itemStories, setItemStories] = useState([]);
  const [itemComics, setItemComics] = useState([]);
  const [itemCharacters, setItemCharacters] = useState([]);

  const saved = localStorage.getItem('items');
  const initialValue = JSON.parse(saved);
  const [favItemList, setFavItemList] = useState(initialValue || '');

  const ROOT = process.env.REACT_APP_ROOT_URL;
  const KEY = process.env.REACT_APP_ROOT_KEY;

  const endPointUrl = `${ROOT}${viewType}${Id}?${KEY}`;

  const getAxiosResponse = useCallback(
    async (endPointUrl) => {
      return axios
        .get(endPointUrl)
        .then((res) => {
          const ItemToDisplayInfo = res.data.data.results[0];
          setItemDetail(ItemToDisplayInfo);
          setItemUrl(ItemToDisplayInfo.urls);
          setItemStories(ItemToDisplayInfo.stories.items);
          if (viewType === '/characters/') {
            setItemComics(ItemToDisplayInfo.comics.items);
          } else if (viewType === '/comics/') {
            setItemCharacters(ItemToDisplayInfo.characters.items);
          }
        })
        .catch((error) => console.log(error));
    },
    [viewType]
  );

  useEffect(() => {
    getAxiosResponse(endPointUrl);
  }, [getAxiosResponse, endPointUrl]);

  useEffect(() => {
    favItemList && localStorage.setItem('items', JSON.stringify(favItemList));
  }, [favItemList]);

  const onAddClickHandler = () => {
    return setFavItemList((prevState) => [itemDetail, ...prevState]);
  };

  const onRemoveClickHandler = (evt) => {
    let {
      target: { value },
    } = evt;
    value = parseInt(value);
    if (Array.isArray(favItemList)) {
      setFavItemList(favItemList.filter((quien) => quien.id !== value));
    }
  };

  const renderMyListbutton = () => {
    let { text, iconClasses, buttonClasses, buttonEvent } = '';

    const itemOnList = favItemList.findIndex((quien) => {
      return quien.id === itemDetail.id;
    });

    if (itemOnList !== -1) {
      text = 'remove';
      iconClasses = 'fa-minus';
      buttonClasses = 'btn-warning';
      buttonEvent = onRemoveClickHandler;
    } else {
      text = 'My List';
      iconClasses = 'fa-plus';
      buttonClasses = 'btn-success';
      buttonEvent = onAddClickHandler;
    }

    return (
      <button
        className={`btn ps-2 ${buttonClasses}`}
        onClick={buttonEvent}
        value={itemDetail.id}
      >
        {text}
        <small className="ms-2">
          <i className={`fas ${iconClasses}`}></i>
        </small>
      </button>
    );
  };

  const renderCharInformation = () => {
    return (
      <Fragment>
        <div className="d-inline-flex mt-4">
          <h3 className="m-0 me-2">{itemDetail.name || itemDetail.title}</h3>
          {renderMyListbutton()}
        </div>

        <p className="text-start my-4">
          {itemDetail.description === ''
            ? (itemDetail.description =
                'There is no description available for this character, visit the links below for more information...')
            : itemDetail.description}
        </p>

        <div className="mb-4">
          {itemCharacters.length === 0 ? (
            <DetailedInfoSection
              information={itemComics}
              sectionName="Comics"
            />
          ) : (
            <DetailedInfoSection
              information={itemCharacters}
              sectionName="Characters"
            />
          )}
        </div>

        <div>
          <DetailedInfoSection
            information={itemStories}
            sectionName="Stories"
          />
        </div>

        <div>
          <WikiLinkSection links={itemUrl} />
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="container my-4 detailView">
        <div className="row">
          <div className="col-4">
            <ImageSection
              path={itemDetail?.thumbnail?.path}
              extension={itemDetail?.thumbnail?.extension}
              name={itemDetail.name}
            />
          </div>
          <div className="col-8">{renderCharInformation()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailedView;
