import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import SearchBar from '../Components/SearchBar';

// import jsonData from '../Jsons/CharacterDetail.json';

const CharacterDetailView = () => {
    const params = useParams();
    const [charDetail, setCharDetail] = useState( {} );
    const [charUrl, setCharUrl] = useState([]);
    const [charStories, setCharStories] = useState([]);

    // const oneCharUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+params.charId+'?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
    const apiUrl1 = 'https://gateway.marvel.com:443/v1/public/characters/'+params.charId+'?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';
    // const apiUrl2 = 'https://gateway.marvel.com:443/v1/public/characters?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
    
        
    
    useEffect(() => {
        axios.get(apiUrl1).then(function (response) {
            setCharDetail(response.data.data.results[0]);
            setCharUrl(response.data.data.results[0].urls)
            setCharStories(response.data.data.results[0].stories.items)
        }).catch(function (error) {
            console.log(error);
        });  
        
        // axios.get(apiUrl1)
        //     .then( (response) => {
        //         setChar(response.data.data.results[0]);
        //     }).catch(error => console.log(error));

    }, [apiUrl1]);        

    // const dataArray = data.data.results;    
    // console.log(dataArray);

    return (
        <>
            <SearchBar />

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
                        {
                            Object.entries(charDetail).length === 0 ? <img src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" className="img-thumbnail" alt=""></img> : <img src={charDetail.thumbnail.path+'.'+charDetail.thumbnail.extension} className="img-thumbnail" alt=""></img>
                        }
                    </div>
                    <div className="col-8">
                        <h3>{charDetail.name}</h3>
                        <p className="text-start">{charDetail.description}</p>

                        <div>
                            <h3>Stories</h3>

                            {
                                charStories.map((story) => {
                                    return <span className="badge rounded-pill bg-primary m-1" key={story.id}>{story.name}</span>
                                })
                            }

                        </div>

                        <div>
                            <ul>
                                <h4 className="mt-4">Learn more about this Character in the following links</h4>
                                {
                                    charUrl.map((url) => {
                                        return <li className="text-start" key={url.type}> <a href={url.url} target="_blank" rel="noreferrer"> {url.type} </a></li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CharacterDetailView;