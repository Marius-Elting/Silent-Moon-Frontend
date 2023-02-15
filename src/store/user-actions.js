import { useHistory } from "react-router-dom"
import { uiActions } from "./ui-slice"
import { userActions } from "./user-slice"


export const loginUser = ({ user, navToHome }) => {
    return async (dispatch) => {
        dispatch(uiActions.showLoading())
        dispatch(uiActions.showAlert({
            message: "Logging in...",
            color: "orange",
            type: "loading"
        }))
        const fetchLogin = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user)
            })
            const data = await response.json()

            return data
        }
        try {
            const fetchData = await fetchLogin()
            dispatch(userActions.login({
                user: fetchData.user,
                token: fetchData.token
            }))
            dispatch(uiActions.showAlert({
                message: "Successfully Logged in",
                color: "green",
                type: "success"
            }))
            setTimeout(() => {
                dispatch(uiActions.unShowLoading())
                dispatch(uiActions.unshowAlert())
                navToHome()
            }, 2000);
            console.log(fetchData)
        } catch (err) {
            dispatch(uiActions.showAlert({
                message: "LoginError",
                color: "red",
                type: "error"
            }))
            console.log(err)
            setTimeout(() => {
                dispatch(uiActions.unShowLoading())
                dispatch(uiActions.unshowAlert())
            }, 1000);
        }
    }
}


export const registerUser = ({ navToHome, user }) => {
    return async (dispatch) => {
        dispatch(uiActions.showLoading())
        dispatch(uiActions.showAlert({
            message: "Register...",
            color: "orange",
            type: "loading"
        }))
        const fetchLogin = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user)
            })
            const data = await response.json()

            return data
        }
        try {
            const fetchData = await fetchLogin()
            dispatch(userActions.login({
                user: fetchData.user,
                token: fetchData.token
            }))
            dispatch(uiActions.showAlert({
                message: "Successfully created User",
                color: "green",
                type: "success"
            }))
            setTimeout(() => {
                dispatch(uiActions.unShowLoading())
                dispatch(uiActions.unshowAlert())
                navToHome()
            }, 2000);
            console.log(fetchData)
        } catch (err) {
            dispatch(uiActions.showAlert({
                message: "RegisterError",
                color: "red",
                type: "error"
            }))
            console.log(err)
            setTimeout(() => {
                dispatch(uiActions.unShowLoading())
                dispatch(uiActions.unshowAlert())
            }, 1000);
        }
    }
}