import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import './SubmitBtn.scss';

const SubmitBtn = ({ children, handleSubmit, disabled }) => {
    const isLoading = useSelector(state => state.ui.isLoading)
    return (
        <div className='submitBtnBox'>
            {isLoading && <Loading center={true} />}
            <button disabled={disabled} onClick={handleSubmit}>{children}</button>
        </div>
    )
}

export default SubmitBtn
