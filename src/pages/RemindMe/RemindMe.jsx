import "./RemindMe.scss";
import React, { useState } from 'react';
import AppHeadline from "../../components/AppHeadline/AppHeadline.jsx";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn.jsx";
import { Link } from "react-router-dom";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';



const RemindMe = () => {
    const [chosenDate, setChosenDate] = useState(["Sun", "Mon", "Tue"]);
    const [chosenTime, setChosenTime] = useState();
    const [sunClass, setSunClass] = useState("brightDay");
    const [monClass, setMonClass] = useState("brightDay");
    const [tueClass, setTueClass] = useState("brightDay");
    const [wedClass, setWedClass] = useState("brightDay");
    const [thuClass, setThuClass] = useState("brightDay");
    const [friClass, setFriClass] = useState("brightDay");
    const [satClass, setSatClass] = useState("brightDay");

    const [value, setValue] = React.useState(dayjs('2022-04-07'));

    function dayChoice(day, currState, setState) {
        console.log("Day: ", day);
        let index = chosenDate.findIndex((days) => days === day);
        console.log(index);

        console.log(setState);
        console.log(currState);

        if (currState === "brightDay") {
            setState("darkDay")
        } else if (currState === "darkDay") {
            setState("brightDay")
        };

        if (index === -1) {
            setChosenDate(prev => [...prev, day]);
        } else {
            setChosenDate(prev => {
                let array = [...prev]
                array.splice(index, 1)
                console.log(array)
                return array
            });
        };
    };

    console.log("Chosen Date: ", chosenDate);

    return (
        <>
            <AppHeadline />
            <section className="ReminMeTimeChoiceWrapper">
                <h2>What time would you like to meditate?</h2>
                <h3>Feel free to choose the time that suits you best, but we recommend to make it the first thing you do in the morning.</h3>
                <p> --- Platzhalter Zeitauswahl --- </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticTimePicker
                        ampm
                        orientation="landscape"
                        openTo="minutes"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </section>
            <section className="RemindMeDayChoiceWrapper">
                <h2>On which days would you like to meditate?</h2>
                <h3>Making the meditation a daily routine would be the best option, but we recommend to meditate at least five times a week.</h3>
                <section className="RemindMeDaysWrapper">
                    <button type="button" className={sunClass} onClick={() => { dayChoice("Sun", sunClass, setSunClass) }}>Sun</button>
                    <button type="button" className={monClass} onClick={() => { dayChoice("Mon", monClass, setMonClass) }}>Mon</button>
                    <button type="button" className={tueClass} onClick={() => { dayChoice("Tue", tueClass, setTueClass) }}>Tue</button>
                    <button type="button" className={wedClass} onClick={() => { dayChoice("Wed", wedClass, setWedClass) }}>Wed</button>
                    <button type="button" className={thuClass} onClick={() => { dayChoice("Thu", thuClass, setThuClass) }}>Thu</button>
                    <button type="button" className={friClass} onClick={() => { dayChoice("Fri", friClass, setFriClass) }}>Fri</button>
                    <button type="button" className={satClass} onClick={() => { dayChoice("Sat", satClass, setSatClass) }}>Sat</button>
                </section>
            </section>
            <section className="RemindMeBtnWrapper">
                <SubmitBtn />
                <Link to="/home">NO THANKS</Link>
            </section>
        </>
    );
};

export default RemindMe;
