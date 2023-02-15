import React from 'react';
import { useState } from 'react';
import {
    CatFilterAll,
    CatFilterAllActive,
    CatFilterAnxiety,
    CatFilterAnxietyActive,
    CatFilterFav,
    CatFilterFavActive,
    CatFilterKids,
    CatFilterKidsActive,
    CatFilterSleep,
    CatFilterSleepActive
} from "../../assets/img/";

const CategoryFilter = () => {

    const [activeCat, setActiveCat] = useState("all")

    return (
        <section>
            <article>
                <img src={activeCat === "all" ? CatFilterAllActive : CatFilterAll} alt="abstract cross" />
                <p>All</p>
            </article>
            <article>
                <img src={activeCat === "fav" ? CatFilterFavActive : CatFilterFav} alt="heart" />
                <p>Favorites</p>
            </article>
            <article>
                <img src={activeCat === "anx" ? CatFilterAnxietyActive : CatFilterAnxiety} alt="anxious smiley" />
                <p>Anxiety</p>
            </article>
            <article>
                <img src={activeCat === "sleep" ? CatFilterSleepActive : CatFilterSleep} alt="moon" />
                <p>Sleep</p>
            </article>
            <article>
                <img src={activeCat === "kids" ? CatFilterKidsActive : CatFilterKids} alt="child smiley" />
                <p>Kids</p>
            </article>
        </section>
    )
}

export default CategoryFilter
