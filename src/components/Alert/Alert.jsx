import { useSelector } from "react-redux"
import "./Alert.scss"

const Alert = () => {
    const { alertMessage, alertColor } = useSelector(state => state.ui)
    return (
        <div className="alert">
            <div style={{
                backgroundColor: alertColor
            }}>{alertMessage}</div>
        </div>

    )
}

export default Alert
