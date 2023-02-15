import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './SubmitBtn.scss';

const SubmitBtn = ({ children, handleSubmit, disabled, type, link }) => {
    const isLoading = useSelector(state => state.ui.isLoading)
    return (<>
        {type === "link" ?
            <div className='submitBtnBox'>
                {isLoading && <Loading center={true} />}
                <Link to={link} disabled={disabled} onClick={handleSubmit}>{children}</Link>
            </div>
            :
            <div className='submitBtnBox'>
                {isLoading && <Loading center={true} />}
                <button disabled={disabled} onClick={handleSubmit}>{children}</button>
            </div>
        }
    </>
    )
}

export default SubmitBtn
