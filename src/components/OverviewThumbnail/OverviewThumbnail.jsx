import { useEffect, useState } from "react";

const OverviewThumnail = (props) => {

    const [size, setSize] = useState("")

    useEffect(() => {
        let number = Math.floor(Math.random() * 3) + 1;

        if (number === 1) {
            setSize("overviewSmallThumbnail");
            return;
        } else if (number === 2) {
            setSize("overviewMediumThumbnail");
            return;
        } else if (number === 3) {
            setSize("overviewLargeThumbnail");
            return;
        }
    }, [props])

    const backgroundImage = { backgroundImage: `url(${props.img})` };




    return (
        <div className={size} style={backgroundImage}>
            <p>{props.name}</p>
        </div>
    );
};

export default OverviewThumnail;