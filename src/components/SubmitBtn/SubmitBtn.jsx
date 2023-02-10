import React from 'react';
import './SubmitBtn.scss';

const SubmitBtn = ({ children, handleSubmit }) => {
    return (
        <div className='submitBtnBox'>
            <button onClick={handleSubmit} className='submitBtn'>{children}</button>
        </div>
    )
}

export default SubmitBtn
