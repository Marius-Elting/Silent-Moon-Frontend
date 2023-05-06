import React from 'react';
import { useState } from 'react';
import {
    CatFilterAll,
    CatFilterAllActive,
    CatFilterAnxiety,
    CatFilterAnxietyActive,
    CatFilterFav,
    CatFilterFavActive,
    CatFilterRecovery,
    CatFilterRecoveryActive,
    CatFilterSleep,
    CatFilterSleepActive
} from "../../assets/img/";
import "./CategoryFilter.scss";

const CategoryFilter = ({ activeCat, setActiveCat, setFilterCriteria }) => {

    return (
        <section className='catFilter'>
            <article onClick={() => {
                setActiveCat("all");
                setFilterCriteria("all")
            }}>
                <img src={activeCat === "all" ? CatFilterAllActive : CatFilterAll} alt="abstract cross" />
                <p className={activeCat === "all" ? "pActive" : "pNotActive"}>All</p>
            </article>

            {/* Fetch für Favoriten muss noch ergänzt werden! */}
            <article onClick={() => { setActiveCat("fav") }}>
                <img src={activeCat === "fav" ? CatFilterFavActive : CatFilterFav} alt="heart" />
                <p className={activeCat === "fav" ? "pActive" : "pNotActive"}>Favorites</p>
            </article>
            {/*  */}

            <article onClick={() => {
                setActiveCat("anx");
                setFilterCriteria("anxiety release")
            }}>
                <img src={activeCat === "anx" ? CatFilterAnxietyActive : CatFilterAnxiety} alt="anxious smiley" />
                <p className={activeCat === "anx" ? "pActive" : "pNotActive"}>Anxiety</p>
            </article>
            <article onClick={() => {
                setActiveCat("sleep");
                setFilterCriteria("sleep")
            }}>
                <img src={activeCat === "sleep" ? CatFilterSleepActive : CatFilterSleep} alt="moon" />
                <p className={activeCat === "sleep" ? "pActive" : "pNotActive"}>Sleep</p>
            </article>
            <article onClick={() => {
                setActiveCat("recovery")
                setFilterCriteria("recovery")
            }}>
                <div className={activeCat === "recovery" ? "catFilterRecoveryBtnActive" : "catFilterRecoveryBtnNotActive"}>
                    <img src={activeCat === "recovery" ? CatFilterRecoveryActive : CatFilterRecovery} alt="recovery" />
                </div>
                <p className={activeCat === "recovery" ? "pActive" : "pNotActive"}>Recovery</p>
            </article>
        </section>
    );
};

export default CategoryFilter;
