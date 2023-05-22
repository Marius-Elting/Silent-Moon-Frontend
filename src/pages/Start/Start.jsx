import React from 'react';
import './Start.scss';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { useSelector } from 'react-redux';

const Start = () => {

    const userData = useSelector(state => state.user.userData);

    const getLink = () => {
        if (userData.remindTime?.days.length > 0 || userData.remindTime) {
            return "home";
        } else {
            return "remindme"
        }

    }

    const firstname = useSelector(state => state.user.userData.firstname);
    return (
        <section className='startSection'>
            <article>
                <h1 className='startHeading'>SILENT MOON</h1>
                <p className='startParagraph'>
                    Namasté {firstname}, welcome to Silent Moon
                </p>
            </article>
            <SubmitBtn type="link" link={`/${getLink()}`}>GET STARTED</SubmitBtn>
        </section>
    );
};

export default Start;
