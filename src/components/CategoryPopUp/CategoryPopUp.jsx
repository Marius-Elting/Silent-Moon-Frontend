import AppHeadline from '../AppHeadline/AppHeadline';
import React, { useEffect, useState } from 'react';
import "./CategoryPopUp.scss"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Loading from '../../components/Loading/Loading';
import SmallCard from '../SmallCard/SmallCard';


const CategoryPopUp = (props) => {

    const navigate = useNavigate();

    const filterCategory = { category: props.category };
    const dispatch = useDispatch();
    const [dataCategory, setDataCategory] = useState([]);
    const user = useSelector(state => state.user);
    const isLoading = useSelector(state => state.ui.isLoading);

    useEffect(() => {
        dispatch(uiActions.showLoading());

        console.log("Popup getriggert");


        async function getData() {
            setDataCategory([]);

            try {
                {
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
                    setDataCategory(data);

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
    }, []);


    return (
        <div className={`catPopup${props.popupVisibility}`}>
            <AppHeadline />
            <button type="button" onClick={() => props.setPopupVisibilty("Hidden")}>X</button>
            <h2>{props.type}</h2>
            <h3>{props.category}</h3>
            <section>
                {dataCategory.map((exercise) => {
                    return (
                        <div>
                            <SmallCard
                                key={exercise._id} name={exercise.name} image={exercise?.image?.url} link={`/detail/${props.type}/${exercise._id}`} />
                        </div>
                    );
                })}
            </section>
        </div>
    )
}

export default CategoryPopUp
