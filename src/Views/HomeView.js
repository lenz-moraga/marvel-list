// import axios from 'axios';
// import React, {useEffect, useState} from 'react';
import Cards from '../Components/Cards/Cards';

import data from '../Jsons/AllCharacters.json';

const HomeView = () => {
    // const [characters, setCharacters] = useState([]);

    const dataArray = [data];
    const dataArray1 = dataArray[0].data.results;
    console.log(dataArray1);

//   const apiUrl1 = 'https://gateway.marvel.com:443/v1/public/characters?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';
//   const apiUrl2 = 'https://gateway.marvel.com:443/v1/public/characters?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';

//   useEffect(() => {
//     axios.get(apiUrl2).then(res => {
//       setCharacters(res.data.data.results);  
//     }).catch(error => console.log(error));
//   });

  return (
    <>
        <h2>Home View</h2>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* {
                characters.map( char => (
                    <Cards values={char} key={char.id} />
                ))
            } */}

            {
                dataArray1.map( (char) => {
                    return <Cards values={char} key={char.id} />
                })
            }
        </div>
    </>
  );
}

export default HomeView;
// cf5cf23a61ba45d6661053f6344efe78