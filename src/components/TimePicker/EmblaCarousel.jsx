import React from 'react'
import { IosPickerItem } from './EmblaCarouselIosPickerItem';
// import EmblaCarousel from 'embla-carousel-react';


const EmblaTimePicker = (props) => {

    // const embla = EmblaCarousel(document.querySelector('.embla__ios-picker__container'));
    // const timePickers = document.querySelectorAll('.embla__ios-picker__slide');

    // embla.on('select', () => {
    //     const selectedPicker = embla.selectedScrollSnap();
    //     const selectedTime = selectedPicker.querySelector('.picker-value').value;
    //     console.log(selectedTime);
    // });

    const { loop } = props


    return (
        <div className="embla">
            <IosPickerItem
                slideCount={24}
                perspective="left"
                loop={false}
                label="hours"
                value="10"
                handleFunction={props.handleFunctionA}
            />
            <IosPickerItem
                slideCount={60}
                perspective="right"
                loop={false}
                label="min"
                value="10"
                handleFunction={props.handleFunctionB}
            />
        </div>
    )
}

export default EmblaTimePicker