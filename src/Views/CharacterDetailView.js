import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";

// import jsonData from '../Jsons/CharacterDetail.json';

const CharacterDetailView = () => {
    const params = useParams();
    const [char, setChar] = useState({});

    // const oneCharUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+params.charId+'?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
    const apiUrl1 = 'https://gateway.marvel.com:443/v1/public/characters/'+params.charId+'?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';
    // const apiUrl2 = 'https://gateway.marvel.com:443/v1/public/characters?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
    
    useEffect(() => {
        axios.get(apiUrl1)
            .then( (response) => {
                setChar(response.data.data.results[0]);
            }).catch(error => console.log(error));
        }, 
        []);        

    // const dataArray = data.data.results;    
    // console.log(dataArray);

    return(
        <>
            <h2 className="mb-4">Character Detail View</h2>

            {/* <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img src={dataArray[0].thumbnail.path+'.'+dataArray[0].thumbnail.extension} className="img-thumbnail"></img>
                    </div>
                    <div className="col-8">
                        <h3>{dataArray[0].name}</h3>
                        <p className="text-start">{dataArray[0].description}</p>
                    </div>
                </div>
            </div> */}

            <div className="container">
                <div className="row">
                    <div className="col-4">
                        {/* <img src={char.thumbnail.path+'.'+char.thumbnail.extension} className="img-thumbnail" alt=""></img> */}
                    </div>
                    <div className="col-8">
                        <h3>{char.name}</h3>
                        <p className="text-start">{char.description}</p>
                    </div>
                </div>
            </div>
        </>
        


    );
}

export default CharacterDetailView;