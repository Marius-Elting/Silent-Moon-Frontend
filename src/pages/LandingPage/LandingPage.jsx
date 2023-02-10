import React from 'react';
import './LandingPage.scss';
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <section className='landingPageSection'>
            <div className='landingPageImg'>
                <AppHeadline />
            </div>
            <article className='landingPageArticle'>
                <h2 className='landingPageHeading'>
                    We are what we do
                </h2>
                <h3 className='landingPageText'>
                    Thousand of people are using silent moon for meditation and yoga classes.
                </h3>
            </article>
            <SubmitBtn>SIGN UP</SubmitBtn>
            <article className='landingPageArticle'>
                <h3 className='landingPageText'>
                    ALREADY HAVE AN ACCOUNT? <Link className='landingPageLink'>LOG IN</Link>
                </h3>
            </article>

        </section>
    )
}

export default LandingPage
