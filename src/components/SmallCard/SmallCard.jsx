import React from 'react';
import { Link } from 'react-router-dom';
import './SmallCard.scss';

const SmallCard = (props) => {
    return (
        <Link className='smallCard' to={props.link}>
            <img alt='Bild' src={props.image}></img>
            <h3>{props.name}</h3>
            <div className="smallCardBottom">
                <p>{props.level}</p>
                <p>{props.duration}</p>
            </div>
        </Link>
    )
}

export default SmallCard
