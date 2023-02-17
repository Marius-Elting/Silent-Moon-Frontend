import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OverviewThumbnail = (props) => {

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

    const backgroundImage = {
        backgroundImage: `linear-gradient(rgba(128, 128, 128, 0), rgba(60,60,60,0.9)), url(${props.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover"
    };




    return (
        <Link to={props.link} className={size} style={backgroundImage} onClick={() => { props.clickHandler(props.type === "cat" ? props.name : props.id) }}>
            <p>{props.name}</p>
        </Link>
    );
};

export default OverviewThumbnail;