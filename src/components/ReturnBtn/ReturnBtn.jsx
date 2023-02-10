import React from 'react';
import './ReturnBtn.scss';
import { BackArrow } from '../../assets/img';

const ReturnBtn = () => {
    return (
        <div className='returnBtnBox'>
            <img src={BackArrow} alt='Back Arrow'></img>
        </div>
    )
}

export default ReturnBtn
