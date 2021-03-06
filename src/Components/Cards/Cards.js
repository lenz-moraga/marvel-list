import React from "react";
import CardBody from './CardsBody/CardBody';

const Cards = (props) => {
    const charObject = props.values;
    const buttonFrom = props.from;

    return (
        <>
            <div className="col">
              <div className="card pt-3" >
                <img src={props.values.thumbnail.path+'.'+props.values.thumbnail.extension} className="card-img-top" style={{width:"60%", margin:"0 auto", height:"215px"}} alt="..."></img>
                
                <CardBody values={charObject} from={buttonFrom}/>

              </div>
            </div>
        </>
    );
}

export default Cards;