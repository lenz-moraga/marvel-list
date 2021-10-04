import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"; 
import axios from 'axios';
import Cards from '../Components/Cards/Cards'
import SearchBar from "../Components/Sections/SearchBar";

const SearchResults = () => {
    const [CharacterCardInformation, setCharacterCardInformation] = useState([]);
    const [ComicsCardInformation, setComicsCardInformation] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();

    // console.log(params.searchparam);

    const rootUrl = "https://gateway.marvel.com:443/v1/public/";

    const characterSearch = 'characters?nameStartsWith='+params.searchparam.trim().split('No.').join('#')+'&';
    const rootComicUrl = 'comics?titleStartsWith='+params.searchparam.trim().split(' No. ').join('%20%23')+'&';

    console.log(rootComicUrl);

    const key1 = 'ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
    const key2 = 'ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';

    const getCharactersUrl = rootUrl.concat(characterSearch).concat(key1);
    const getComicsUrl = rootUrl.concat(rootComicUrl).concat(key2);

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

        axios.get(getCharactersUrl).then(res => {
            const transformedObject = res.data.data.results.map(
                cardData => {
                    return {
                        id: cardData.id,
                        name: cardData.name,
                        desc: cardData.description,
                        stories: cardData.stories,
                        thumbnail: cardData.thumbnail,
                        url: cardData.urls,
                        from: 'characterView',
                        type: 'character'
                    }
                });
                setCharacterCardInformation(transformedObject); 

        }).catch(error => console.log(error));

        axios.get(getComicsUrl).then(res => {
            const transformedObject = res.data.data.results.map(
                cardData => {
                    return {
                        id: cardData.id,
                        name: cardData.title,
                        desc: cardData.description,
                        stories: cardData.stories,
                        thumbnail: cardData.thumbnail,
                        url: cardData.urls,
                        from: 'comicView',
                        type: 'comic'
                    }
                });
                setComicsCardInformation(transformedObject); 
                setIsLoading(false);

        }).catch(error => console.log(error));

    }, [getCharactersUrl, getComicsUrl]);
    
    const WholeData = Object.values( CharacterCardInformation .concat(ComicsCardInformation) );    

    const renderCards = () => {
        return (
            WholeData.map((val) => {
                if( isLoading ) {
                     return (
                         <p key={val.id}>Loading...</p>
                     );
                 }
                 return (
                     <Cards values={val} key={val.id} from="characterView"/>
                 );
             })
        );
    }
       
    return (
        <>
            <SearchBar />

            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 mb-2">
                { renderCards() }
            </div>
        </>
    );
}

export default SearchResults;