import axios from 'axios';
import React, {useEffect, useState} from 'react';

import Cards from '../Components/Cards/Cards';

const CharacterView = () => {
  const [cardInformation, setCardInformation] = useState([]);

  const getCharactersUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';

  useEffect(() => {
    axios.get(getCharactersUrl).then(res => {

      const transformedObject = res.data.data.results.map(
          (cardData) => {
              return {
                    id: cardData.id,
                    name: cardData.name,
                    desc: cardData.description,
                    thumbnail: cardData.thumbnail,
                    comics: cardData.comics,
                    series: cardData.series,
                    stories: cardData.stories,
                    events: cardData.events,
                    urls: cardData.urls,
                    from: 'characterView',
              }
          });
          
      setCardInformation(transformedObject); 
      
      }).catch(error => console.log(error));
  }, []);

    return (
        <>
            <h2 className="my-4">Characters</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    cardInformation.map( char => (
                        <Cards values={char} key={char.id} from="characterView"/>
                    ))
                }
            </div>
        </>
    );
}

export default CharacterView;