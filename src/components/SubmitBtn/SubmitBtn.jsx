import React from 'react';
import './SubmitBtn.scss';

const SubmitBtn = ({ children, handleSubmit, disabled }) => {
    return (
        <div className='submitBtnBox'>
            <button disabled={disabled} onClick={handleSubmit} className='submitBtn'>{children}</button>
        </div>
    )
}

export default SubmitBtn
