import "./RemindMe.scss";
import React, { useEffect, useState } from 'react';
import AppHeadline from "../../components/AppHeadline/AppHeadline.jsx";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/scss';
// import { Pagination } from "@mui/material";
// import EmblaTimePicker from "../../components/TimePicker/EmblaCarousel";
// import EmblaCarousel from 'embla-carousel';
// import emblaCarouselReact from "embla-carousel-react";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import { setRemindTime } from "../../store/user-actions"



const RemindMe = () => {

    const navigate = useNavigate();

    const userData = useSelector(state => state.user.userData);

    const [chosenDate, setChosenDate] = useState([]);


    useEffect(() => {
        if (userData.remindTime.days.length > 0) {
            setChosenDate(userData.remindTime.days);

            setValue(userData.remindTime.time);
        };
    }, [userData]);





    // const [sunClass, setSunClass] = useState("brightDay");
    // const [monClass, setMonClass] = useState("brightDay");
    // const [tueClass, setTueClass] = useState("brightDay");
    // const [wedClass, setWedClass] = useState("brightDay");
    // const [thuClass, setThuClass] = useState("brightDay");
    // const [friClass, setFriClass] = useState("brightDay");
    // const [satClass, setSatClass] = useState("brightDay");

    // const [chosenTime, setChosenTime] = useState();

    const [value, setValue] = React.useState(dayjs());
    console.log("Value: ", value)

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




    function elementsOverlap(el1, el2) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();

        return !(
            domRect1.top > domRect2.bottom ||
            domRect1.right < domRect2.left ||
            domRect1.bottom < domRect2.top ||
            domRect1.left > domRect2.right
        );
    };

    const onchangeHandlerA = (ac) => {

    };
    const onchangeHandlerB = (ac) => {
        const a = [...ac];
        const filterd = a.filter((res) => res.opacity == "1");

    };

    // dispatch(setRemindTime(chosenDate, chosenTime, userData._id));
    const dispatch = useDispatch()

    const submitHandler = () => {
        // setChosenTime(value.$d);
        value && dispatch(setRemindTime(chosenDate, value, userData._id, navToHome));
        value && console.log("submitHandler", chosenDate, value, userData._id);

    }

    const navToHome = () => {
        navigate("/home")
    }

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
                {/* <div className="swiperContainer">
                    <Swiper
                        className="swiper"
                        {...paramsSwiper}
                        pagination={{ clickable: true }}
                        // modules={[Pagination]}

                        onSlideChange={() =>  ('slide change')}
                        onSwiper={(swiper) =>  (swiper)}
                    >

                        <SwiperSlide style={{ height: "10px" }}>Slide 1</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }}>Slide 2</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }}>Slide 3</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }}>Slide 4</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }}>Slide 5</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }}>Slide 6</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }}>Slide 7</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }} >Slide 8</SwiperSlide>
                        <SwiperSlide style={{ height: "10px" }}>Slide 9</SwiperSlide>


                    </Swiper>
                </div> */}

                {/* <EmblaTimePicker handleFunctionA={onchangeHandlerA} handleFunctionB={onchangeHandlerB} /> */}

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
                <SubmitBtn handleSubmit={submitHandler} >SAVE</SubmitBtn>
                <Link to="/home" className="noThxBtn">NO THANKS</Link>
            </section>
        </main>
    );
};

export default RemindMe;
