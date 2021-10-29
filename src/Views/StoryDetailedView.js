import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DetailedInfoSection from "../Components/Sections/DetailedInfoSection";

const StoryDetailedView = () => {
  const { storyId } = useParams();
  const [storyCharacter, setStoryCharacter] = useState([]);
  const [storyDetail, setStoryDetail] = useState({});
  const [storyComics, setStoryComics] = useState([]);

  const ROOT = process.env.REACT_APP_ROOT_URL;
  const KEY = process.env.REACT_APP_ROOT_KEY;

  const endPointUrl = `${ROOT}/stories/${storyId}?${KEY}`;

  useEffect(() => {
    axios
      .get(endPointUrl)
      .then(function (response) {
        const storyInfo = response.data.data.results[0];
        setStoryDetail(storyInfo);
        setStoryCharacter(storyInfo.characters.items);
        setStoryComics(storyInfo.comics.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [endPointUrl]);

  const renderCharInformation = () => {
    return (
      <Fragment>
        <h3>{storyDetail.title}</h3>
        <p className="text-start">
          {!storyDetail.description
            ? (storyDetail.description =
                "There is no description available for this character, visit the links below for more information...")
            : storyDetail.description}
        </p>

        <div className="my-4">
          <h3>Characters</h3>
          <DetailedInfoSection information={storyCharacter} />
        </div>

        <div>
          <h3>Comics</h3>
          <DetailedInfoSection information={storyComics} />
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="container my-4">
        <div className="row">
          <div className="col-10 offset-1">{renderCharInformation()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default StoryDetailedView;
