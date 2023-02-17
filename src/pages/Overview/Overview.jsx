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
import OverviewThumbnail from '../../components/OverviewThumbnail/OverviewThumbnail';
import CategoryPopUp from '../../components/CategoryPopUp/CategoryPopUp';


const Overview = () => {

    const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const navigate = useNavigate();
    const params = useParams().type;
    const paramsObj = params === "yoga" ? { type: params } : { type: "meditation" };
    const today = new Date();
    const month = monthsArray[today.getMonth()];
    const day = today.getDate();

    // Trigger for fetches
    const [activeCat, setActiveCat] = useState("all");
    const [filterCriteria, setFilterCriteria] = useState("");
    const filterCategory = { category: filterCriteria };

    // user & loading circle
    const dispatch = useDispatch();
    const [dataCategories, setDataCategories] = useState([]);
    const user = useSelector(state => state.user);
    const isLoading = useSelector(state => state.ui.isLoading);

    // Trigger for searchbar
    const [visibility, setVisibility] = useState("Hidden");
    // Trigger for popup
    const [popupVisibility, setPopupVisibility] = useState("Hidden");
    const [popupCat, setPopupCat] = useState();


    // daily calm - random - trigger + fetch
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


    // Fetch for categories or exercises per category
    useEffect(() => {
        dispatch(uiActions.showLoading());

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

                    dispatch(uiActions.unShowLoading());
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

                    dispatch(uiActions.unShowLoading());
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

    // Function for popup
    const clickHandlerCat = (name) => {
        setPopupVisibility("Shown");
        setPopupCat(name);
        console.log("ClickHandlerCat triggered");

        return
        // (
        //     <CategoryPopUp popupVisibility={popupVisibility} setPopupVisibility={setPopupVisibility} category={popupCat} type={params} />
        // )
    }

    console.log("popupCat: ", popupCat, " & popupVisibility: ", popupVisibility);

    //Function for rerouting to detail page for each exercise
    const clickHandlerEx = (id) => {
        console.log("ClickHandlerEx triggered");
        console.log(`/details/${params}/${id}`);

        navigate(`/details/${params}/${id}`)
    }



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

            {isLoading && <Loading center={true} />}
            <section className='overviewThumbnails'>
                {activeCat === "all" ?
                    dataCategories.map((category, index) => {
                        return (
                            <OverviewThumbnail key={index} type="cat" name={category.name} img={category?.img?.url} clickHandler={clickHandlerCat} />
                        );
                    }) :
                    dataCategories.map((category, index) => {
                        return (
                            <OverviewThumbnail key={index} type="ex" id={category._id} name={category.name} img={category?.image?.url} link={`/detail/${params}/${category._id}`} />
                        );
                    })
                }
            </section>

            {popupVisibility === "Shown" && <CategoryPopUp popupVisibility={popupVisibility} setPopupVisibility={setPopupVisibility} category={popupCat} type={params} />
            }




            <Navbar page={params} />
        </div>
    );
};

export default Overview;
