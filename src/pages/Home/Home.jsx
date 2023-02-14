import React, { useEffect, useState } from 'react';
import './Home.scss';
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import Navbar from '../../components/Navbar/Navbar';
import { HealthyBack } from '../../assets/img';
import { Meditate } from '../../assets/img/'
import { Link } from 'react-router-dom';
import Searchbar from '../../components/Searchbar/Searchbar';
import SmallCard from '../../components/SmallCard/SmallCard';

const Home = () => {
    const user = "Steffi";
    const [data, setData] = useState();
    console.log(data);

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/getexercise');
            const data = await response.json();
            setData(data);
        }
        getData();
    }, []);



    return (
        <section className='homeSection'>
            <AppHeadline />
            <div className='homeFirstDiv'>
                <h2 className='homeHeading'>Good morning {user}</h2>
                <p className='homeParagraph'>
                    We hope you have a good day
                </p>
            </div>
            <article className='homeArticle'>
                <div className='homeSecondDiv'>
                    <p className='homeSecondDivName'>Healthy Back</p>
                    <p className='homeSecondDivLevel'>BEGINNER</p>
                    <div className='homeSecondDivTimeButton'>
                        <p className='homeSecondDivTime'>3-10 MIN</p>
                        <Link className='homeLink'>
                            <button>START</button>
                        </Link>
                    </div>
                </div>

                <div className='homeThirdDiv'>
                    <p className='homeThirdDivName'>Meditation</p>
                    <p className='homeSecondDivLevel'>BEGINNER</p>
                    <div className='homeThirdDivTimeButton'>
                        <p className='homeThirdDivTime'>3-10 MIN</p>
                        <Link className='homeLink'>
                            <button className='homeThirdDivBtn'>START</button>
                        </Link>
                    </div>
                </div>
            </article>
            <Searchbar />

            <article className='homeYoga'>
                <p>Recomended Yoga for you</p>
                {
                    data?.filter(element => element.type === 'yoga').map((element, index) => {
                        return (
                            <SmallCard key={index} image={element.image.url} name={element.name} />
                        )
                    })
                }
            </article>

            <article className='homeMeditation'>
                <p>Recomended Meditation for you</p>
                {
                    data?.filter(element => element.type === 'meditation').map((element, index) => {
                        return (
                            <SmallCard key={index} image={element.image.url} name={element.name} />
                        )
                    })
                }
            </article>

            <Navbar />
        </section>
    )
}

export default Home
