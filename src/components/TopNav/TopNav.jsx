import React from 'react';
import './TopNav.scss';
import { BackArrowTopNav } from '../../assets/img';
import { HeartTopNav } from '../../assets/img';
import { DownloadTopNav } from '../../assets/img';
import { CloseTopNav } from '../../assets/img';

const TopNav = (props) => {
    return (
        <article className='topNavArticle'>
            <div>
                <img src={props.symbol === 'arrow' ? BackArrowTopNav : CloseTopNav} alt='Arrow Back'></img>
            </div>
            <div>
                <img src={HeartTopNav} alt='Heart'></img>
                <img src={DownloadTopNav} alt='Download'></img>
            </div>
        </article>
    )
}

export default TopNav
