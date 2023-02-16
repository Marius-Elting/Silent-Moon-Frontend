import React from 'react'
import { IosPickerItem } from './EmblaCarouselIosPickerItem'

const EmblaTimePicker = (props) => {
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