import "./Loading.scss";

const Loading = ({ center, customStyle }) => {

    return <div style={customStyle} className={center ? "loading-center" : ""}>
        <div
            className={`loading ${center ? "loading-center" : ""}`}>

        </div>
    </div>;
};


export default Loading;