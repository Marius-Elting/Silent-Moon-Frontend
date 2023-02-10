import React from 'react';
import './SubmitBtn.scss';

const SubmitBtn = ({ children }) => {
    return (
        <div className='submitBtnBox'>
            <button className='submitBtn'>{children}</button>
        </div>
    )
}

export default SubmitBtn
