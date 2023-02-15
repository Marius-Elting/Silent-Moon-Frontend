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
    const today = new Date();
    const month = monthsArray[today.getMonth()];
    const day = today.getDate();

    const [activeCat, setActiveCat] = useState("all");
    console.log("Aktive Kategorie: ", activeCat);

    const [filterCriteria, setFilterCriteria] = useState("");
    console.log("Aktiver Filter: ", filterCriteria);

    const filterCategory = { category: filterCriteria };
    console.log("filterCategory: ", filterCategory);

    const dispatch = useDispatch()
    const [dataCategories, setDataCategories] = useState([]);
    const user = useSelector(state => state.user?.userData?.firstname);
    const isLoading = useSelector(state => state.ui.isLoading);

    useEffect(() => {
        dispatch(uiActions.showLoading())
        async function getData() {
            try {
                console.log("Try start");
                if (activeCat === "all") {
                    const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/getcategories');
                    const data = await response.json();
                    setDataCategories(data);
                    dispatch(uiActions.unShowLoading())
                    console.log(data, " try if all");
                    return
                } else {
                    const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/getsinglecategory', {
                        method: 'Post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(filterCategory)
                    });
                    const data = await response.json();
                    setDataCategories(data);
                    dispatch(uiActions.unShowLoading())
                    console.log(data, " try if not all");
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
    }, [activeCat]);





    return (
        <div className='overviewPage'>
            <AppHeadline />
            <h2>{params}</h2>
            <h3>{params === "yoga" ? "Find your inner zen from anywhere." : "Audio-only meditation techniques to help you minimize your screen time and practice on the go."}</h3>
            <CategoryFilter activeCat={activeCat} setActiveCat={setActiveCat} setFilterCriteria={setFilterCriteria} />
            <Searchbar />
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
                            <OverviewThumnail key={index} name={category} />
                        )
                    }) :
                    dataCategories.map((category, index) => {
                        return (
                            <OverviewThumnail key={index} name={category.name} />
                        )
                    })
                }
            </section>

            <Navbar page={params} />
        </div>
    )
}

export default Overview;
