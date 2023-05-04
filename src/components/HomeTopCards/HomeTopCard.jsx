import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import "./HomeTopCard.scss"
const HomeTopCard = ({ name, level, duration, image, id, type }) => {
    // console.log(image)
    const divRef = useRef()
    return (
        <div style={{
            backgroundImage: `url(${image})`,
        }} ref={divRef} className='homeTopCardWrapper'>
            <p className='homeTopCardHeadline'>{name}</p>
            <p className='homeTopCardLevel'>{level}</p>
            <div>
                <p>{duration}</p>
                <Link to={`/detail/${type}/${id}`}>
                    <button>START</button>
                </Link>
            </div>
        </div>
    )
}

export default HomeTopCard
