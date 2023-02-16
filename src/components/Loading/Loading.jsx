import "./Loading.scss";

const Loading = ({ center, customStyle }) => {

    return <div style={customStyle}
        className={`loading ${center ? "loading-center" : ""}`}>

    </div>;
};


export default Loading;