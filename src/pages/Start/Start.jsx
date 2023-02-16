import React from 'react';
import './Start.scss';
import AppHeadline from '../../components/AppHeadline/AppHeadline'
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';

const Start = () => {
    return (
        <section className='startSection'>
            <h1 className='startHeading'>SILENT MOON</h1>
            <p className='startParagraph'>
                Hi Leon, welcome to Silent Moon
            </p>
            <SubmitBtn type="link" link="/home">GET STARTED</SubmitBtn>
        </section>
    )
}

export default Start
