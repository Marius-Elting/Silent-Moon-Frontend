import "./RemindMe.scss";
import React, { useState } from 'react';
import AppHeadline from "../../components/AppHeadline/AppHeadline.jsx";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn.jsx";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Pagination } from "@mui/material";
import EmblaTimePicker from "../../components/TimePicker/EmblaCarousel";
import EmblaCarousel from 'embla-carousel'
import emblaCarouselReact from "embla-carousel-react";


// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';



const RemindMe = () => {
    const [chosenDate, setChosenDate] = useState(["Sun", "Mon", "Tue"]);

    const [sunClass, setSunClass] = useState("brightDay");
    const [monClass, setMonClass] = useState("brightDay");
    const [tueClass, setTueClass] = useState("brightDay");
    const [wedClass, setWedClass] = useState("brightDay");
    const [thuClass, setThuClass] = useState("brightDay");
    const [friClass, setFriClass] = useState("brightDay");
    const [satClass, setSatClass] = useState("brightDay");

    const [chosenTime, setChosenTime] = useState();

    // const [value, setValue] = React.useState(dayjs('2022-04-07'));

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

    // const paramsSwiper = {
    //     spaceBetween: 10,
    //     slidesPerView: "auto",
    //     allowSlideNext: true,
    //     allowSlidePrev: true,
    //     allowTouchMove: true,
    //     centeredSlides: true,
    //     centeredSlidesBounds: true,
    //     direction: "vertical",
    //     effect: "slide",
    //     scrollbar: true,
    //     freeMode: true,
    //     height: 5,
    //     loop: true,

    // }

    return (
        <>
            <AppHeadline />
            <section className="RemindMeTimeChoiceWrapper">
                <h2>When would you like to meditate?</h2>
                <h3>Feel free to choose the time that suits you best, but we recommend meditating first thing in the morning.</h3>

                {/* <LocalizationProvider dateAdapter={AdapterDayjs} className="timePicker">
                    <StaticTimePicker
                        ampm
                        displayStaticWrapperAs="mobile"
                        orientation="portrait"
                        openTo="hours"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                {/* <div className="swiperContainer">
                    <Swiper
                        className="swiper"
                        {...paramsSwiper}
                        pagination={{ clickable: true }}
                        // modules={[Pagination]}

                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
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

                <EmblaTimePicker />

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
                <Link to="/home"><SubmitBtn>SAVE</SubmitBtn></Link>
                <Link to="/home" className="noThxBtn">NO THANKS</Link>
            </section>
        </>
    );
};

export default RemindMe;
