import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cards from "../Components/Cards/Cards";

const SearchResults = () => {
  const [wholeData, setWholeData] = useState([]);
  const [storyId, setStoryId] = useState("");
  const [storiesList, setStoriesList] = useState([]);
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

  const characterSearch =
    "characters?nameStartsWith=" + params.searchparam.trim() + "&";
  const comicSearch = "comics?titleStartsWith=" + getComicFilter() + "&";

  const key1 =
    "ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78";
  // const key2 =
  //   "ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9";

  // const getCharactersUrl = rootUrl.concat(characterSearch).concat(key1);
  // const getComicsUrl = rootUrl.concat(comicSearch).concat(key2);

  // First 20 characters              https://gateway.marvel.com:443/v1/public/characters?apikey=

  // Filter characters by name.       https://gateway.marvel.com:443/v1/public/characters?name=iron%20man&apikey=
  // Filter characters by comics.     https://gateway.marvel.com:443/v1/public/characters?comics= 331
  // Character's comics.              https://gateway.marvel.com:443/v1/public/characters/1009368/comics?apikey=
  // All characters with that id      https://gateway.marvel.com:443/v1/public/characters/1009368?apikey=

  // First 20 comics                  https://gateway.marvel.com:443/v1/public/comics?apikey=

  // Filter by format.                https://gateway.marvel.com:443/v1/public/comics?format=hardcover&apikey=
  // Filter by title.                 https://gateway.marvel.com:443/v1/public/comics?title=The%20Hunted%20Part%205&apikey=
  // Filter by issue number.          https://gateway.marvel.com:443/v1/public/comics?issueNumber=54&apikey=
  // Comic's characters.              https://gateway.marvel.com:443/v1/public/comics?characters=Iron%20Man&apikey=
  // Stories comics.                  https://gateway.marvel.com:443/v1/public/comics?stories=331&apikey=

  // const getCharactersUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
  // const getComicsUrl = "https://gateway.marvel.com:443/v1/public/comics?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9";

  useEffect(() => {
    setIsLoading(true);

    const storiePartialUrl = storyId ? `stories=${storyId}&` : "";

    const characterUrl = `${rootUrl}${characterSearch}${storiePartialUrl}orderBy=name&${key1}`;
    const comicUrl = `${rootUrl}${comicSearch}${storiePartialUrl}orderBy=title&${key1}`;

    console.log(comicUrl);

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
  }, [characterSearch, comicSearch, storyId]);

  useEffect(() => {
    if (storiesList.length > 0 || wholeData.length === 0) return;

    const storiesListFound = wholeData.reduce((acc, curr) => {
      const currStories = curr?.stories?.items || [];
      return [...acc, ...currStories];
    }, []);
    setStoriesList(storiesListFound);
  }, [storiesList, wholeData]);

  const onChangeStoryName = (evt) => {
    const {
      target: { value },
    } = evt;
    setStoryId(value);
  };

  const renderCards = () => {

    // if (wholeData.length === 0) return;
    // const { comics, characters } = wholeData.reduce((acc, curr) => {
    //   let { comics, characters } = acc;
    //   const dataType = curr.type;

    //   switch (dataType) {
    //     case "character":
    //        characters = [ ...characters, curr];
    //        break;
    //     case "comic":
    //        comics = [ ...comics, curr];
    //        break;
    //     default: 
    //       break;
    //   }
    //   return { characters, comics };
    // }, {
    //   comics: [],
    //   characters: []
    // });

    // const finalData = [...characters, ...comics];

    return wholeData
      //.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map((val) => {
        if (isLoading) return <p key={val.id}>Loading...</p>;
        return <Cards values={val} key={val.id} from="characterView" />;
      });
  };



  const renderFilters = () => {
    const storiesUrls = storiesList.map((storiesUrl) => {
      return storiesUrl.resourceURI;
    });

    return storiesList
      .filter(
        (storiesArray, index) =>
          storiesUrls.indexOf(storiesArray.resourceURI) === index
      )
      .map((val) => {
        const id = val.resourceURI.split("/stories/")[1];

        return (
          <div className="form-check" key={id}>
            <input
              className="form-check-input"
              name="filter"
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

  return (
    <>
      <div className="row">
        <div className="col-3">
          <div>
            <div
              className="g-4 my-4 overflow-auto"
              style={{
                height: "26rem",
                position: "fixed",
                left: "4rem",
                width: "18rem",
                textAlign: "left",
                top: "147px",
              }}
            >
              <h3>Stories</h3>
              {renderFilters()}
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
