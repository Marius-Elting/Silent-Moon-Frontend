import React from 'react';
import './TopNav.scss';
import { BackArrowTopNav, HeartActive } from '../../assets/img';
import { HeartTopNav } from '../../assets/img';
import { CloseTopNav } from '../../assets/img';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/user-actions';

const TopNav = ({ handleClickFunction, symbol, data, page }) => {
    const favorites = useSelector(state => state.user.favorites);
    const dispatch = useDispatch();


    return (
        <article className='topNavArticle'>
            <div>
                <img src={symbol === 'arrow' ? BackArrowTopNav : CloseTopNav} alt='Arrow Back' onClick={handleClickFunction}></img>
            </div>
            {page !== "false" &&
                <div>
                    <img onClick={() =>
                        dispatch(toggleFavorite(data.item, data.user))
                    } src={
                        favorites.filter(fav => fav?.id === data?.item?.id).length > 0 ? HeartActive : HeartTopNav

                    } alt='Heart'></img>

                </div>}
        </article>
    );
};

export default TopNav;
