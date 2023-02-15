import React from 'react';
import './ReturnBtn.scss';
import { BackArrow } from '../../assets/img';
import { Link } from 'react-router-dom';

const ReturnBtn = ({ link }) => {
    return (
        <Link to={link} className='returnBtnBox'>
            <img src={BackArrow} alt='Back Arrow'></img>
        </Link>
    )
}

export default ReturnBtn
