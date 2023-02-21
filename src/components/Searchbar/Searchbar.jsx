import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Searchbar.scss';

import SmallCard from '../../components/SmallCard/SmallCard';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';



const Searchbar = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    // console.log(user);
    const params = useParams().type;
    const [data, setData] = useState([]);
    const [dataFav, setDataFav] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [searchResult, setSearchResult] = useState();
    const loadingComponent = useSelector(state => state.ui.loadingComponent);

    // Function to filter data
    const filterData = (data, search) => {
        return data.filter(element => element.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    };

    // Fetch for all excercises
    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("searchbar"));

        async function getData() {
            if (props.page !== "profile") {
                try {

                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getexercise', {
                        credentials: "include",
                    });
                    const data = await response.json();
                    setData(data);
                    // console.log(data)

                    dispatch(uiActions.unsetLoadingComponent("searchbar"));
                } catch (err) {
                    dispatch(uiActions.unsetLoadingComponent("searchbar"));
                    dispatch(uiActions.showAlert({
                        type: "error",
                        message: "Database Error",
                        color: "red"
                    }));
                }
            } else if (props.page === "profile") {
                try {

                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getfavorites', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            id: user.userData._id,
                            type: "all"
                        })
                    })
                    const data = await response.json();
                    setDataFav(data.favorites);

                    // console.log("Data from fav fetch :", data.favorites)

                    dispatch(uiActions.unsetLoadingComponent("searchbar"));
                } catch (err) {
                    dispatch(uiActions.unsetLoadingComponent("searchbar"));
                    dispatch(uiActions.showAlert({
                        type: "error",
                        message: "Database Error",
                        color: "red"
                    }));
                }
            }
        }
        getData();
    }, []);


    // Filter Fetch outcome for search value
    useEffect(() => {

        if (searchValue === "" || !searchValue) {
            props.setVisibility("Hidden");
            setSearchResult();
        }
        else if (props.page === "profile") {
            setSearchResult(filterData(dataFav, searchValue));
            props.setVisibility("Shown");
        }
        else if (params === "yoga" && searchValue) {
            setSearchResult(filterData(data, searchValue).filter(element => element.type === "yoga"));
            props.setVisibility("Shown");
        } else if (params === "meditate" && searchValue) {
            setSearchResult(filterData(data, searchValue).filter(element => element.type === "meditation"));
            props.setVisibility("Shown");
        } else if (!params && searchValue) {
            setSearchResult(filterData(data, searchValue));
            props.setVisibility("Shown");
        }

    }, [searchValue]);


    return (
        <div className='searchBarDiv'>
            <input className='search' onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value !== "") {
                    props.setVisibility("Shown");
                } else if (e.target.value === "") {
                    props.setVisibility("Hidden");
                }
            }}></input>

            <section className={`searchResults${props.visibility}`}>
                {!searchResult || searchResult.length === 0 && searchValue !== "" ? <p>No results match your search.</p> : searchResult.map((element, index) => {


                    return (
                        <div className='searchResultSmallCardWrapper' key={index} >
                            <SmallCard link={`/detail/${element.type}/${element._id}`} image={element.image?.url} name={element.name} level={element.level} duration={element.duration} />
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default Searchbar;
