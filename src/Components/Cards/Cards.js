import React from "react";
import CardBody from './CardBody';
import '../Buttons/Button.css';

import './Cards.css'

const Cards = (props) => {
    const charObject = props.values;
    const buttonFrom = props.values.from;

    return (
        <>
            <div className="col">
              <div className="card pt-3">
                <img src={props.values.thumbnail.path+'.'+props.values.thumbnail.extension} className="card-img-top" alt="..."></img>
                
                <CardBody values={charObject} from={buttonFrom}/>

              </div>
            </div>
        </>
    );
}

export default Cards;