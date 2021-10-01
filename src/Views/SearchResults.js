import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"; 
import axios from 'axios';
import Cards from '../Components/Cards/Cards'
import SearchBar from "../Components/Sections/SearchBar";

const SearchResults = () => {
    const [CharacterCardInformation, setCharacterCardInformation] = useState([]);
    const [ComicsCardInformation, setComicsCardInformation] = useState([]);
    const [storiesMatch, setStoriesMatch] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    
    const getCharactersUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
    const getComicsUrl = "https://gateway.marvel.com:443/v1/public/comics?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9";

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

    }, []);
    
    const WholeData = Object.values(CharacterCardInformation.concat(ComicsCardInformation));    
    // console.log(WholeData);
       
    return (
        <>
            <SearchBar />

            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
                {   
                    WholeData.map((val) => {
                        (Object.values(val.stories.items).map( 
                            story => {

                                if( story.name.toString().toLowerCase().trim().includes(params.searchparam.toString().toLowerCase().trim()) || val.id.toString().includes(params.searchparam) || val.name.toString().toLowerCase().includes(params.searchparam.toLowerCase()) ) {
                                    console.log(story.name);
                                    if ( !isLoading ) { 
                                        return (
                                            <Cards values={val} key={val.id} from="characterView"/>
                                        );
                                    } if( isLoading ) {
                                        return (
                                            <p key={val.id}>Loading...</p>
                                        );
                                    }
                                } else {
                                    return false;
                                }
                            })  
                        )

                        // if( val.id.toString().includes(params.searchparam) || val.name.toString().toLowerCase().includes(params.searchparam.toLowerCase())) {
                            
                        //     if ( !isLoading ) { 
                        //         return (
                        //             <Cards values={val} key={val.id} from="characterView"/>
                        //         );
                        //     } if( isLoading ) {
                        //         return (
                        //             <p key={val.id}>Loading...</p>
                        //         );
                        //     }
                        // }
                    })
                }
            </div>
        </>
    );
}

export default SearchResults;