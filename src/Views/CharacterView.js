import axios from 'axios';
import React, {useEffect, useState} from 'react';

import Cards from '../Components/Cards/Cards';
import SearchBar from "../Components/Sections/SearchBar";

// import data from '../Jsons/AllCharacters.json';

const CharacterView = () => {
  const [cardInformation, setCardInformation] = useState([]);

    // const dataArray = [data];
    // const dataArray1 = dataArray[0].data.results;

  const getCharactersUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';
//   const apiUrl2 = 'https://gateway.marvel.com:443/v1/public/characters?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';

  useEffect(() => {
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
      setCardInformation(transformedObject); 
      
      }).catch(error => console.log(error));
  }, []);

    return (
        <>
            <SearchBar />
            
            <h2 className="my-4">Characters</h2>
        
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    cardInformation.map( char => (
                        <Cards values={char} key={char.id} from="characterView"/>
                    ))
                }

                {/* {
                    dataArray1.map( (char) => {
                        return <Cards values={char} key={char.id} from="characterView"/>
                    })
                } */}
            </div>
        </>
    );
}

export default CharacterView;