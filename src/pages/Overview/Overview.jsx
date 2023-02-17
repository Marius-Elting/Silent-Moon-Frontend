import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./Overview.scss";
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import Searchbar from '../../components/Searchbar/Searchbar';
import { PlayBtn } from '../../assets/img';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Loading from '../../components/Loading/Loading';
import OverviewThumnail from '../../components/OverviewThumbnail/OverviewThumbnail';


const Overview = () => {

    const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const navigate = useNavigate();
    const params = useParams().type;
    const paramsObj = params === "yoga" ? { type: params } : { type: "meditation" };
    const today = new Date();
    const month = monthsArray[today.getMonth()];
    const day = today.getDate();

    const [activeCat, setActiveCat] = useState("all");

    const [filterCriteria, setFilterCriteria] = useState("");

    const filterCategory = { category: filterCriteria };

    const dispatch = useDispatch();
    const [dataCategories, setDataCategories] = useState([]);
    const user = useSelector(state => state.user);
    const loadingComponent = useSelector(state => state.ui.loadingComponent);

    const [visibility, setVisibility] = useState("Hidden");

    const [dataRandom, setDataRandom] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getexercise', {
                    credentials: "include",
                });
                const data = await response.json();
                setDataRandom(data[Math.floor(Math.random() * (data.length - 1))]);
            } catch (err) {
                dispatch(uiActions.showAlert({
                    type: "error",
                    message: "Database Error",
                    color: "red"
                }));
            }
        }
        getData();
    }, [params]);

    console.log("Data Random: ", dataRandom);

    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("overview"));


        async function getData() {
            setDataCategories([]);

            try {
                if (activeCat === "all") {
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getcategorybytype', {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        credentials: "include",
                        body: JSON.stringify(paramsObj)
                    });
                    const data = await response.json();
                    setDataCategories(data);
                    dispatch(uiActions.unsetLoadingComponent("overview"));


                    return;
                } else {
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getsinglecategory', {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        credentials: "include",
                        body: JSON.stringify(filterCategory)
                    });
                    const data = await response.json();
                    setDataCategories(data);

                    dispatch(uiActions.unsetLoadingComponent("overview"));

                    return;
                }

            } catch (err) {
                dispatch(uiActions.unShowLoading());
                dispatch(uiActions.showAlert({
                    type: "error",
                    message: "Database Error",
                    color: "red"
                }));
            };
        };
        getData();
    }, [activeCat, params]);


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
                    <Link to={`/detail/${params}/${dataRandom?._id}`} ><img src={PlayBtn} alt="Play Button" /></Link>
                </article>
            </section>

            {loadingComponent.includes("overview") && <Loading center={true} />}
            <section className='overviewThumbnails'>
                {activeCat === "all" ?
                    dataCategories.map((category, index) => {
                        return (
                            <OverviewThumnail key={index} name={category.name} img={category?.img?.url} />
                        );
                    }) :
                    dataCategories.map((category, index) => {
                        return (
                            <OverviewThumnail key={index} name={category.name} img={category?.image?.url} onClick={() => navigate(`/details/${params}/${category._id}`)} />
                        );
                    })
                }
            </section>

            <Navbar page={params} />
        </div>
    );
};
// 
export default Overview;
