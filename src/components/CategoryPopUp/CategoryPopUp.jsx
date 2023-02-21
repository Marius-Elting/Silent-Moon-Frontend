import AppHeadline from '../AppHeadline/AppHeadline';
import React, { useEffect, useState } from 'react';
import "./CategoryPopUp.scss";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Loading from '../../components/Loading/Loading';
import SmallCard from '../SmallCard/SmallCard';


const CategoryPopUp = (props) => {
    const filterCategory = { category: props.category };
    const dispatch = useDispatch();
    const [dataCategory, setDataCategory] = useState([]);
    const user = useSelector(state => state.user);
    const loadingComponent = useSelector(state => state.ui.loadingComponent);

    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("CatPopUp"));
        async function getData() {
            setDataCategory([]);
            try {
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
            } catch (err) {
                dispatch(uiActions.showAlert({
                    type: "error",
                    message: "Database Error",
                    color: "red"
                }));
            };
            dispatch(uiActions.unsetLoadingComponent("CatPopUp"));

        };
        getData();
    }, []);

    const closePopup = () => {

    };


    return (
        <div className={`catPopup${props.popupVisibility}`}>
            <AppHeadline />
            <button type="button" onClick={() => props.setPopupVisibility("Hidden")}>X</button>
            <h2>{props.type}</h2>
            <h3>{props.category}</h3>
            {loadingComponent.includes("CatPopUp") && <Loading center="true" />}
            <section>
                {dataCategory.filter(cat => cat.type === props.type).map((exercise) => {
                    const image = exercise.type === "yoga" ? exercise?.image?.imagePath.url : exercise?.image?.url;

                    return (
                        <div>
                            <SmallCard
                                key={exercise._id} name={exercise.name} image={image} link={`/detail/${props.type}/${exercise._id}`} />
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default CategoryPopUp;
