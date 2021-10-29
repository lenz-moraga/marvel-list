import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cards from '../Components/Cards/Cards';
import FilterSection from '../Components/Sections/FilterSection';

import data from '../Assets/Jsons/ConstantObjects.json';

const SearchResults = () => {
  const TYPE_FILTER_DATA = data.constants.TYPE_FILTER_DATA;
  const FORMAT_FILTER_DATA = data.constants.FORMAT_FILTER_DATA;

  const FILTER_INITIAL_STATE = 'all';

  const [wholeData, setWholeData] = useState([]);
  const [storiesList, setStoriesList] = useState([]);
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchType, setSearchType] = useState(FILTER_INITIAL_STATE);
  const [storyId, setStoryId] = useState(FILTER_INITIAL_STATE);
  const [comicId, setComicId] = useState(FILTER_INITIAL_STATE);
  const [formatID, setFormatId] = useState(FILTER_INITIAL_STATE);

  const { searchparam } = useParams();

  const getComicFilter = () => {
    let comicStartName, year, issue;
    let structuredComicUrl = '';
    /*If the user is looking for a comic with the exact structure: name (year) #issue number, the app should make the following validations, if the user writes the complete structure, the if's will destructure the string.*/

    /*first, the name of the comic, if there are any parenthesis, it should get the text before them, else, the user might be looking for a character or making the search by just the name of the comic.*/
    if (searchparam.lastIndexOf('(') > 1) {
      comicStartName = searchparam
        .trim()
        .substring(0, searchparam.lastIndexOf('('));
      structuredComicUrl += comicStartName.trim();
    } else {
      structuredComicUrl += searchparam.trim();
    }

    /*if the user is using a more complete structure using the parenthesis and the year, we will get that year here. */

    if (searchparam.indexOf('(') > 0) {
      year = searchparam.substring(
        searchparam.indexOf('(') + 1,
        searchparam.lastIndexOf(')')
      );

      if (!isNaN(year)) {
        structuredComicUrl += `&startYear=${year}`;
      }
    }

    /*for the issue number, we are replacing the # in the URL, so we can identify whether if the user is looking for the comin using the issue number or not*/
    issue = searchparam.split('No.').join('#');
    if (issue.indexOf('#') > 0) {
      structuredComicUrl += `&issueNumber=${issue.split('#')[1]}`;
    }

    return structuredComicUrl;
  };

  const rootUrl = process.env.REACT_APP_ROOT_URL;
  const key = process.env.REACT_APP_ROOT_KEY;

  const searchParameter = searchparam.trim();
  const characterSearch = isNaN(searchParameter)
    ? `characters?nameStartsWith=${searchParameter}&`
    : `characters/${searchParameter}?`;

  const comicSearch = `comics?${
    formatID !== FILTER_INITIAL_STATE ? `format=${formatID}&` : ''
  }titleStartsWith=${getComicFilter()}&`;

  useEffect(() => {
    setIsLoading(true);

    const storiePartialUrl = !isNaN(parseInt(storyId))
      ? `stories=${storyId}&`
      : '';

    const comicPartialUrl = !isNaN(parseInt(comicId))
      ? `comics=${comicId}&`
      : '';

    const characterUrl = `${rootUrl}/${characterSearch}${comicPartialUrl}${storiePartialUrl}${key}`;

    let comicUrl;

    if (searchType === 'comicType' && !isNaN(comicId)) {
      comicUrl = `${rootUrl}/comics/${comicId}?${key}`;
    } else {
      comicUrl = `${rootUrl}/${comicSearch}${storiePartialUrl}${key}`;
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
              from: 'characterView',
              type: 'character',
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
            from: 'comicView',
            type: 'comicType',
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
  }, [
    characterSearch,
    comicSearch,
    storyId,
    comicId,
    searchType,
    rootUrl,
    key,
  ]);

  useEffect(() => {
    if (wholeData.length === 0) return;

    const { storiesListFound, comicsListFound } = wholeData.reduce(
      (acc, curr) => {
        const currStories = curr?.stories?.items || [];
        const currComics = curr?.characterComics?.items || [];
        return {
          ...acc,
          storiesListFound: [...acc.storiesListFound, ...currStories],
          comicsListFound: [...acc.comicsListFound, ...currComics],
        };
      },
      {
        storiesListFound: [],
        comicsListFound: [],
      }
    );
    setStoriesList(storiesListFound);
    setComicsList(comicsListFound);
  }, [wholeData]);

  const onChangeSearchType = (evt) => {
    const {
      target: { value },
    } = evt;

    setSearchType(value);
  };

  const onChangeStoryName = (evt) => {
    const {
      target: { value },
    } = evt;

    setStoryId(value);
  };

  const onChangeComicsName = (evt) => {
    const {
      target: { value },
    } = evt;

    setComicId(value);
  };

  const onChangeFormatType = (evt) => {
    const {
      target: { value },
    } = evt;
    setFormatId(value);
  };

  const renderCards = () => {
    const searchTypeData = wholeData.filter((val) => val.type === searchType);
    const dataToRender =
      searchType === FILTER_INITIAL_STATE ? wholeData : searchTypeData;

    if (isLoading) return <p>Loading...</p>;
    if (dataToRender.length === 0)
      return <p>No data found try to adjust the filters</p>;

    return dataToRender.map((val) => {
      return <Cards values={val} key={val.id} />;
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-3">
          <div>
            <div className="g-4 my-4 overflow-auto text-start">
              <div className="type-container">
                <h3>Search Type</h3>
                <FilterSection
                  filterType={'Search Type'}
                  filterGroup={'searchType'}
                  filterData={TYPE_FILTER_DATA}
                  selectedRadioButton={searchType}
                  onFilterChange={onChangeSearchType}
                />
                <hr />
              </div>
              <div className="mt-4">
                <h3>Stories</h3>
                <FilterSection
                  filterType={'Stories'}
                  filterGroup={'Story'}
                  filterData={storiesList}
                  selectedRadioButton={storyId}
                  onFilterChange={onChangeStoryName}
                />
                <hr />
              </div>
              <div className="mt-4">
                <h3>Comics</h3>
                <FilterSection
                  filterType={'Comics'}
                  filterGroup={'Comic'}
                  filterData={comicsList}
                  selectedRadioButton={comicId}
                  onFilterChange={onChangeComicsName}
                />
                <hr />
              </div>
              {
                <div className="mt-4">
                  <h3>Format</h3>
                  <FilterSection
                    filterType={'Format'}
                    filterGroup={'format-type'}
                    filterData={FORMAT_FILTER_DATA}
                    selectedRadioButton={formatID}
                    onFilterChange={onChangeFormatType}
                  />
                </div>
              }
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 mb-2">
            {renderCards()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchResults;
