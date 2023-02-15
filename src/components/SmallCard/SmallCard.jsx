import React from 'react';
import './SmallCard.scss';

const SmallCard = (props) => {
    return (
        <div className='smallCard'>
            <img alt='Bild' src={props.image}></img>
            <h3>{props.name}</h3>
            <div className="smallCardBottom">
                <p>BEGINNER</p>
                <p>3-10 MIN</p>
            </div>
        </div>
    )
}

export default SmallCard
