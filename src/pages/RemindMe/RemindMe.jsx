import "./RemindMe.scss";
import React, { useEffect, useState } from 'react';
import AppHeadline from "../../components/AppHeadline/AppHeadline.jsx";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import { setRemindTime } from "../../store/user-actions";

const RemindMe = () => {

    const navigate = useNavigate();

    const userData = useSelector(state => state.user.userData);
    const isLoading = useSelector(state => state.ui.isLoading);
    const [chosenDate, setChosenDate] = useState([]);


    useEffect(() => {
        try {
            if (userData.remindTime.days.length > 0) {
                setChosenDate(userData.remindTime.days);
                console.log("AKSJD");
                setValue(userData.remindTime.time);
            };
        } catch (err) {
            console.log(err);
        }
    }, [userData]);




    // const [sunClass, setSunClass] = useState("brightDay");
    // const [monClass, setMonClass] = useState("brightDay");
    // const [tueClass, setTueClass] = useState("brightDay");
    // const [wedClass, setWedClass] = useState("brightDay");
    // const [thuClass, setThuClass] = useState("brightDay");
    // const [friClass, setFriClass] = useState("brightDay");
    // const [satClass, setSatClass] = useState("brightDay");
    // const [chosenTime, setChosenTime] = useState();

    const [value, setValue] = useState(dayjs());
    console.log("Value: ", value);

    function dayChoice(day, currState, setState) {

        let index = chosenDate.findIndex((days) => days === day);


        // if (currState === "brightDay") {
        //     setState("darkDay");
        // } else if (currState === "darkDay") {
        //     setState("brightDay");
        // };

        if (index === -1) {
            setChosenDate(prev => [...prev, day]);
        } else {
            setChosenDate(prev => {
                let array = [...prev];
                array.splice(index, 1);

                return array;
            });
        };
    };


    // dispatch(setRemindTime(chosenDate, chosenTime, userData._id));
    const dispatch = useDispatch();

    const submitHandler = () => {
        // setChosenTime(value.$d);
        value && dispatch(setRemindTime(chosenDate, value, userData._id, navToHome));
        value && console.log("submitHandler", chosenDate, value, userData._id);
    };

    const navToHome = () => {
        navigate("/home");
    };

    return (
        <main className={"RemindMeWrapper"}>
            <AppHeadline />
            <section className="RemindMeTimeChoiceWrapper">
                <h2>When would you like to meditate?</h2>
                <h3>Feel free to choose the time that suits you best, but we recommend meditating first thing in the morning.</h3>

                <LocalizationProvider dateAdapter={AdapterDayjs} className="timePicker">
                    <StaticTimePicker
                        ampm
                        displayStaticWrapperAs="mobile"
                        orientation="portrait"
                        openTo="hours"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue.$d);
                        }}
                        showButtonLabels={false}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </section>
            <section className="RemindMeDayChoiceWrapper">
                <h2>On which days would you like to meditate?</h2>
                <h3>Making the meditation a daily routine would be the best option, but we recommend to meditate at least five times a week.</h3>
                <section className="RemindMeDaysWrapper">
                    <button type="button" className={chosenDate.findIndex((days) => days === "Sun") === -1 ? "brightDay" : "darkDay"} onClick={() => { dayChoice("Sun"); }}>Sun</button>
                    <button type="button" className={chosenDate.findIndex((days) => days === "Mon") === -1 ? "brightDay" : "darkDay"} onClick={() => { dayChoice("Mon"); }}>Mon</button>
                    <button type="button" className={chosenDate.findIndex((days) => days === "Tue") === -1 ? "brightDay" : "darkDay"} onClick={() => { dayChoice("Tue"); }}>Tue</button>
                    <button type="button" className={chosenDate.findIndex((days) => days === "Wed") === -1 ? "brightDay" : "darkDay"} onClick={() => { dayChoice("Wed"); }}>Wed</button>
                    <button type="button" className={chosenDate.findIndex((days) => days === "Thu") === -1 ? "brightDay" : "darkDay"} onClick={() => { dayChoice("Thu"); }}>Thu</button>
                    <button type="button" className={chosenDate.findIndex((days) => days === "Fri") === -1 ? "brightDay" : "darkDay"} onClick={() => { dayChoice("Fri"); }}>Fri</button>
                    <button type="button" className={chosenDate.findIndex((days) => days === "Sat") === -1 ? "brightDay" : "darkDay"} onClick={() => { dayChoice("Sat"); }}>Sat</button>
                </section>
            </section>
            <section className="RemindMeBtnWrapper">
                <SubmitBtn disabled={isLoading ? true : false} handleSubmit={submitHandler} >SAVE</SubmitBtn>
                <Link to="/home" className="noThxBtn">NO THANKS</Link>
            </section>
        </main>
    );
};

export default RemindMe;
