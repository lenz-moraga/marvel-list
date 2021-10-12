import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";

const CharacterDetailView = () => {
    const params = useParams();
    const [charDetail, setCharDetail] = useState( {} );
    const [charUrl, setCharUrl] = useState([]);
    const [charStories, setCharStories] = useState([]);

    const apiUrl1 = 'https://gateway.marvel.com:443/v1/public/characters/'+params.charId+'?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';
    
    useEffect(() => {
        axios.get(apiUrl1).then(function (response) {
            setCharDetail(response.data.data.results[0]);
            setCharUrl(response.data.data.results[0].urls)
            setCharStories(response.data.data.results[0].stories.items)
        }).catch(function (error) {
            console.log(error);
        });  
        
    }, [apiUrl1]);        

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-4">
                        {
                            Object.entries(charDetail).length === 0 ? <img src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" className="img-thumbnail" alt=""></img> : <img src={charDetail.thumbnail.path+'.'+charDetail.thumbnail.extension} className="img-thumbnail" alt=""></img>
                        }
                    </div>
                    <div className="col-8">
                        <h3>{charDetail.name}</h3>
                        <p className="text-start">
                            
                            {
                            
                            (charDetail.description === '') ? charDetail.description='There is no description available for this character, visit the links below for more information...' : charDetail.description
                            
                            }
                            
                            </p>

                        <div>
                            <h3>Stories</h3>

                            {
                                charStories.slice(0, 10).map((story) => {
                                    return <span className="badge rounded-pill bg-primary m-1 p-2" key={story.name}>
                                        <a className="text-light text-decoration-none text-capitalize" href={story.resourceURI} target="_blank" rel="noreferrer" > {story.name} </a>
                                        </span>
                                })
                            }

                        </div>

                        <div>
                            <ul>
                                <h4 className="mt-4">Learn more about this Character in the following links</h4>
                                {
                                    charUrl.map((url) => {
                                        return <li className="text-start text-capitalize" key={url.type}> <a href={url.url} target="_blank" rel="noreferrer"> {url.type} </a></li>
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