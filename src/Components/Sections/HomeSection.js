import axios from 'axios';
import React, {useEffect, useState} from 'react';

import Cards from '../Cards/Cards';
import Button from '../Buttons/Button';

const HomeSection = (props) => {    
    const [cardInformation, setCardInformation] = useState([]);

    // const dataArray = [data];
    // const dataArray1 = dataArray[0].data.results;
    // console.log(dataArray1);
    // script to pull from the json default file, if the Response request limit is reached

    //   const apiUrl1 = 'https://gateway.marvel.com:443/v1/public/characters?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9';
    const getCharactersUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=35&apikey=9e388ca2a7369beba8961e77512c7424&hash=cf5cf23a61ba45d6661053f6344efe78';
    const getComicsUrl = "https://gateway.marvel.com:443/v1/public/comics?ts=71&apikey=557c4a290d82f5c62dd430ce6d7b52a7&hash=f888c6636658ce15613721c842998aa9";

    useEffect(() => {
        if(props.sectionType === 'charactersSection') {
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
        } else if(props.sectionType === 'comicsSection') {
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
                setCardInformation(transformedObject); 
                }).catch(error => console.log(error));
        }
    }, [props.sectionType]);

    return (
        <>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    cardInformation.slice(0,3).map( char => (
                        <Cards values={char} key={char.id}/>
                    ))
                }

                {/* {
                    dataArray1.map( (char) => {
                        return <Cards values={char} key={char.id} />
                    })
                    // script to pull from the json default file, if the Response request limit is reached
                } */}

                <Button buttonType={props.buttonType} value={props.viewMoreValue} cssClasses="btn btn-primary mx-auto mt-3 mb-5"/>
            </div>
        </>
    );
}

export default HomeSection;