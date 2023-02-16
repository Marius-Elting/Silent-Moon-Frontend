import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Searchbar.scss';

import SmallCard from '../../components/SmallCard/SmallCard';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Loading from '../../components/Loading/Loading';



const Searchbar = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const params = useParams().type;
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [searchResult, setSearchResult] = useState();


    // Function to filter data
    const filterData = (data, search) => {
        return data.filter(element => element.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }

    // Fetch for all excercises
    useEffect(() => {
        dispatch(uiActions.showLoading());
        async function getData() {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getexercise', {
                    credentials: "include",
                });
                const data = await response.json();
                setData(data);
                dispatch(uiActions.unShowLoading());
            } catch (err) {
                dispatch(uiActions.unShowLoading());
                dispatch(uiActions.showAlert({
                    type: "error",
                    message: "Database Error",
                    color: "red"
                }));
            }
        }
        getData();
    }, [searchValue]);


    // Filter Fetch outcome for search value
    useEffect(() => {
        if (searchValue === "" || !searchValue) {
            props.setVisibility("Hidden");
            setSearchResult();
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
                setSearchValue(e.target.value)
                if (e.target.value !== "") {
                    props.setVisibility("Shown")
                } else if (e.target.value === "") {
                    props.setVisibility("Hidden")
                }
            }}></input>

            <section className={`searchResults${props.visibility}`}>
                {!searchResult || searchResult.length === 0 && searchValue !== "" ? <p>No results match your search.</p> : searchResult.map((element, index) => {

                    return (
                        <div className='searchResultSmallCardWrapper' key={index} >
                            <Link to={`/detail/yoga/${element._id}`}>
                                <SmallCard image={element.image?.url} name={element.name} level={element.level} duration={element.duration} />
                            </Link>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export default Searchbar
