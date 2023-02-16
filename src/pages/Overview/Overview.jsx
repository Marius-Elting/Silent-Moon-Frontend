import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./Overview.scss";
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import Searchbar from '../../components/Searchbar/Searchbar';
import { PlayBtn } from '../../assets/img';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Loading from '../../components/Loading/Loading';
import OverviewThumnail from '../../components/OverviewThumbnail/OverviewThumbnail';


const Overview = () => {

    const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const params = useParams().type;
    const paramsObj = params === "yoga" ? { type: params } : { type: "meditation" }
    const today = new Date();
    const month = monthsArray[today.getMonth()];
    const day = today.getDate();

    const [activeCat, setActiveCat] = useState("all");

    const [filterCriteria, setFilterCriteria] = useState("");

    const filterCategory = { category: filterCriteria };

    const dispatch = useDispatch()
    const [dataCategories, setDataCategories] = useState([]);
    const user = useSelector(state => state.user?.userData?.firstname);
    const isLoading = useSelector(state => state.ui.isLoading);

    const [visibility, setVisibility] = useState("Hidden");

    useEffect(() => {
        dispatch(uiActions.showLoading())
        console.log("useEffect start");
        async function getData() {
            setDataCategories([]);
            console.log("start getData")
            try {
                if (activeCat === "all") {
                    const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/getcategorybytype', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paramsObj)
                    });
                    const data = await response.json();
                    setDataCategories(data);
                    console.log("all: ", data);
                    dispatch(uiActions.unShowLoading())
                    return
                } else {
                    const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/getsinglecategory', {
                        method: 'Post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(filterCategory)
                    });
                    const data = await response.json();
                    setDataCategories(data);
                    console.log("not all: ", data);
                    dispatch(uiActions.unShowLoading())
                    return
                }

            } catch (err) {
                dispatch(uiActions.unShowLoading())
                dispatch(uiActions.showAlert({
                    type: "error",
                    message: "Database Error",
                    color: "red"
                }))
            };
        };
        getData();
    }, [activeCat, params]);

    console.log("DataCategories: ", dataCategories);

    return (
        <div className='overviewPage'>
            <AppHeadline />
            <div>
                <h2>{params}</h2>
                <h3>{params === "yoga" ? "Find your inner zen from anywhere." : "Audio-only meditation techniques to help you minimize your screen time and practice on the go."}</h3>
            </div>
            <CategoryFilter activeCat={activeCat} setActiveCat={setActiveCat} setFilterCriteria={setFilterCriteria} />

            <Searchbar visibility={visibility} setVisibility={setVisibility} />
            <section className='overviewDaily'>
                <article>
                    <h4>Daily Calm</h4>
                    <div>
                        <p>{`${month} ${day}`}</p>
                        <p> • </p>
                        <p>PAUSE PRACTICE</p>
                    </div>
                </article>
                <article>
                    <Link><img src={PlayBtn} alt="Play Button" /></Link>
                </article>
            </section>

            <section className='overviewThumbnails'>
                {isLoading && <Loading center={true} />}
                {activeCat === "all" ?
                    dataCategories.map((category, index) => {
                        return (
                            <OverviewThumnail key={index} name={category.name} img={category?.img?.url} />
                        )
                    }) :
                    dataCategories.map((category, index) => {
                        return (
                            <OverviewThumnail key={index} name={category.name} img={category?.image?.url} />
                        )
                    })
                }
            </section>

            <Navbar page={params} />
        </div>
    )
}
// 
export default Overview;
