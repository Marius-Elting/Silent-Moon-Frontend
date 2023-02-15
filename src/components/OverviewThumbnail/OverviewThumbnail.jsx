import { useEffect, useState } from "react";

const OverviewThumnail = (props) => {

    const [size, setSize] = useState("")

    useEffect(() => {
        let number = Math.floor(Math.random() * 3) + 1;
        console.log(number);

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




    return (
        <div className={size}>
            <p>{props.name}</p>
        </div>
    );
};

export default OverviewThumnail;