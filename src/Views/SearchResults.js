import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cards from "../Components/Cards/Cards";

import "./SearchResults.css";

const SearchResults = () => {
  const [wholeData, setWholeData] = useState([]);
  const [storyId, setStoryId] = useState("");
  const [comicId, setComicId] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [searchType, setSearchType] = useState("");
  const [storiesList, setStoriesList] = useState([]);
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  const getComicFilter = () => {
    let comicStartName, year, issue;
    let structuredComicUrl = "";
    /*If the user is looking for a comic with the exact structure: name (year) #issue number, the app should make the following validations, if the user writes the complete structure, the if's will destructure the string.*/

    /*first, the name of the comic, if there are any parenthesis, it should get the text before them, else, the user might be looking for a character or making the search by just the name of the comic.*/
    if (params.searchparam.lastIndexOf("(") > 1) {
      comicStartName = params.searchparam
        .trim()
        .substring(0, params.searchparam.lastIndexOf("("));
      structuredComicUrl += comicStartName.trim();
    } else {
      structuredComicUrl += params.searchparam.trim();
    }

    /*if the user is using a more complete structure using the parenthesis and the year, we will get that year here. */
    if (params.searchparam.indexOf("(") > 0) {
      year = params.searchparam.substring(
        params.searchparam.indexOf("(") + 1,
        params.searchparam.lastIndexOf(")")
      );
      structuredComicUrl += "&startYear=" + year;
    }

    /*for the issue number, we are replacing the # in the URL, so we can identify whether if the user is looking for the comin using the issue number or not*/
    issue = params.searchparam.split("No.").join("#");
    if (issue.indexOf("#") > 0) {
      structuredComicUrl += "&issueNumber=" + issue.split("#")[1];
    }

    return structuredComicUrl;
  };

  const rootUrl = "https://gateway.marvel.com:443/v1/public/";

  const searchParameter = params.searchparam.trim();
  const characterSearch = isNaN(searchParameter)
    ? `characters?nameStartsWith=${searchParameter}&`
    : `characters/${searchParameter}?`;
  const comicSearch = `comics?titleStartsWith=${getComicFilter()}&`;

  const key1 =
    "ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78";

  useEffect(() => {
    setIsLoading(true);

    const storiePartialUrl = storyId ? `stories=${storyId}&` : "";
    const comicPartialUrl = comicId ? `comics=${comicId}&` : "";

    const characterUrl = `${rootUrl}${characterSearch}${comicPartialUrl}${storiePartialUrl}${key1}`;

    let comicUrl;
    if (searchType === 'comic' && comicId) {
      comicUrl = `${rootUrl}comics/${comicId}?${key1}`;
    } else {
      comicUrl = `${rootUrl}${comicSearch}${storiePartialUrl}${key1}`;
    }

    const characterRequest = axios.get(characterUrl);
    const comicsRequest = axios.get(comicUrl);

    Promise.all([characterRequest, comicsRequest])
      .then((resp) => {
        const [characterResp, comicsResp] = resp;
        const charactersObject = characterResp.data.data.results.map(
          (cardData) => {
            return {
              id: cardData.id,
              name: cardData.name,
              desc: cardData.description,
              characterComics: cardData.comics,
              stories: cardData.stories,
              thumbnail: cardData.thumbnail,
              url: cardData.urls,
              from: "characterView",
              type: "character",
            };
          }
        );
        const comicsObject = comicsResp.data.data.results.map((cardData) => {
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

        setWholeData([...charactersObject, ...comicsObject]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [characterSearch, comicSearch, storyId, comicId, searchType]);

  useEffect(() => {
    if (wholeData.length === 0) return;

    const storiesListFound = wholeData.reduce((acc, curr) => {
      const currStories = curr?.stories?.items || [];
      return [...acc, ...currStories];
    }, []);
    setStoriesList(storiesListFound);

    const comicsListFound = wholeData.reduce((acc, curr) => {
      const currComics = curr?.characterComics?.items || [];
      return [...acc, ...currComics];
    }, []);
    setComicsList(comicsListFound);
  }, [wholeData]);

  const onChangeStoryName = (evt) => {
    const {
      target: { value },
    } = evt;
    setStoryId(value);
    setComicId("");
  };

  const onChangeComicsName = (evt) => {
    const {
      target: { value },
    } = evt;
    setComicId(value);
    setStoryId("");
  };

  const renderCards = () => { 
    const searchTypeData = wholeData.filter( val => val.type === searchType);
    const dataToRender = searchTypeData.length === 0 ? wholeData : searchTypeData;

    if (dataToRender.length === 0 ) { return <p>No data found try to adjust the filters</p> }

    return dataToRender.map((val) => {
      if (isLoading) return <p key={val.id}>Loading...</p>;
      return <Cards values={val} key={val.id} from="characterView" />;
    });
  };

  const renderStoriesFilters = () => {
    const storiesUrls = storiesList.map((storiesUrl) => {
      return storiesUrl.resourceURI;
    });

    return storiesList
      .filter(
        (storiesArray, index) =>
          storiesUrls.indexOf(storiesArray.resourceURI) === index
      )
      .filter((nonBlankStories) => nonBlankStories.name)
      .map((val) => {
        const id = val.resourceURI.split("/stories/")[1];

        return (
          <div className="form-check" key={id}>
            <input
              className="form-check-input"
              name="Filter"
              type="radio"
              value={id}
              id={id}
              onChange={onChangeStoryName}
            />
            <label className="form-check-label" htmlFor={id}>
              {val.name}
            </label>
          </div>
        );
      });
  };

  const onChangeSearchType = (evt) => {
    const {target:{value}} = evt;

    console.log(value);

    setSearchType(value);
    value === 'all' ? setIsChecked(false) : setIsChecked(true);
  }

  const renderComicsFilters = () => {
    const comicsUrls = comicsList.map((comicUrl) => {
      return comicUrl.resourceURI;
    });

    if (searchType === 'comic') {
      return wholeData.filter( val => val.type === searchType).map(val => {
        return (
          <div className="form-check" key={val.id}>
            <input
              className="form-check-input"
              name="Filter"
              type="radio"
              value={val.id}
              id={val.id}
              onChange={onChangeComicsName}
            />
            <label className="form-check-label" htmlFor={val.id}>
              {val.name}
            </label>
          </div>
        )
      });
    } else {
      return comicsList
      .filter(
        (comicsArray, index) =>
          comicsUrls.indexOf(comicsArray.resourceURI) === index
      )
      .filter((nonBlankComics) => nonBlankComics.name)
      .map((val) => {
        const id = val.resourceURI.split("/comics/")[1];

        return (
          <div className="form-check" key={id}>
            <input
              className="form-check-input"
              name="Filter"
              type="radio"
              value={id}
              id={id}
              onChange={onChangeComicsName}
            />
            <label className="form-check-label" htmlFor={id}>
              {val.name}
            </label>
          </div>
        );
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-3">
          <div>
            <div className="g-4 my-4 overflow-auto text-start">
              <div className="type-container">
                <h3>Search Type</h3>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="typeFilter"
                    type="radio"
                    value="all"
                    id="allRadioButton"
                    onChange={onChangeSearchType}
                    checked={isChecked}
                  />
                  <label className="form-check-label" htmlFor="allRadioButton">
                    All
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="typeFilter"
                    type="radio"
                    value="character"
                    id="characterRadioButton"
                    onChange={onChangeSearchType}
                  />
                  <label className="form-check-label" htmlFor="characterRadioButton">
                    Character
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="typeFilter"
                    type="radio"
                    value="comic"
                    id="comicRadioButton"
                    onChange={onChangeSearchType}
                  />
                  <label className="form-check-label" htmlFor="comicRadioButton">
                    Comic
                  </label>
                </div>
              </div>
              <div className="stories-container">
                <h3>Stories</h3>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="Filter"
                    type="radio"
                    value=""
                    id="allStories"
                    onChange={onChangeStoryName}
                  />
                  <label className="form-check-label" htmlFor="allStories">
                    All
                  </label>
                </div>
                {renderStoriesFilters()}
              </div>
              <div className="comics-container mt-4">
                <h3>Comics</h3>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="Filter"
                    type="radio"
                    value=""
                    id="allComics"
                    onChange={onChangeComicsName}
                  />
                  <label className="form-check-label" htmlFor="allComics">
                    All
                  </label>
                </div>
                {renderComicsFilters()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 mb-2">
            {renderCards()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
