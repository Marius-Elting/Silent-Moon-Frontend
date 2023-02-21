import React, { useState } from 'react';
import './Start.scss';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Start = () => {

    const userData = useSelector(state => state.user.userData);
    // console.log(remindTime.days.length)
    const [page, setPage] = useState("remindme");

    useEffect(() => {
        if (userData.remindTime?.days.length > 0 || userData.remindTime) {
            setPage("home");
        }
    }, []);


    const firstname = useSelector(state => state.user.userData.firstname);
    return (
        <section className='startSection'>
            <article>
                <h1 className='startHeading'>SILENT MOON</h1>
                <p className='startParagraph'>
                    Namasté {firstname}, welcome to Silent Moon
                </p>
            </article>
            <SubmitBtn type="link" link={`/${page}`}>GET STARTED</SubmitBtn>
        </section>
    );
};

export default Start;
