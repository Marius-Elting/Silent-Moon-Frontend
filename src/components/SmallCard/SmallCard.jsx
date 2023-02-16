import React from 'react';
import './SmallCard.scss';

const SmallCard = (props) => {
    return (
        <div className='smallCard'>
            <img alt='Bild' src={props.image}></img>
            <h3>{props.name}</h3>
            <div className="smallCardBottom">
                <p>{props.level}</p>
                <p>{props.duration}</p>
            </div>
        </div>
    )
}

export default SmallCard
