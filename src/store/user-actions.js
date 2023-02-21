
import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";


export const loginUser = ({ user, navToHome }) => {
    return async (dispatch) => {
        dispatch(uiActions.showLoading());
        dispatch(uiActions.showAlert({
            message: "Logging in...",
            color: "orange",
            type: "loading"
        }));
        const fetchLogin = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(user)
            });
            const data = await response.json();
            console.log(data);
            return data;
        };
        try {
            const fetchData = await fetchLogin();
            dispatch(userActions.login({
                user: fetchData.user,
                token: fetchData.token
            }));
            dispatch(uiActions.showAlert({
                message: "Successfully Logged in",
                color: "green",
                type: "success"
            }));
            setTimeout(() => {
                dispatch(uiActions.unShowLoading());
                dispatch(uiActions.unshowAlert());
                navToHome();
            }, 2000);

        } catch (err) {
            dispatch(uiActions.showAlert({
                message: "LoginError",
                color: "red",
                type: "error"
            }));

            setTimeout(() => {
                dispatch(uiActions.unShowLoading());
                dispatch(uiActions.unshowAlert());
            }, 1000);
        }
    };
};


export const registerUser = ({ navToHome, user }) => {
    return async (dispatch) => {
        dispatch(uiActions.showLoading());
        dispatch(uiActions.showAlert({
            message: "Register...",
            color: "orange",
            type: "loading"
        }));
        const fetchLogin = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/register', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(user)

            });
            const data = await response.json();

            return data;
        };
        let fetchData;
        try {
            fetchData = await fetchLogin();
            dispatch(userActions.login({
                user: fetchData.user,
                token: fetchData.token
            }));
            dispatch(uiActions.showAlert({
                message: "Successfully created User",
                color: "green",
                type: "success"
            }));
            setTimeout(() => {
                dispatch(uiActions.unShowLoading());
                dispatch(uiActions.unshowAlert());
                navToHome();
            }, 2000);

        } catch (err) {

            dispatch(uiActions.showAlert({
                message: fetchData.message.join("\n"),
                color: "red",
                type: "error"
            }));

            setTimeout(() => {
                dispatch(uiActions.unShowLoading());
                dispatch(uiActions.unshowAlert());
            }, 2000);
        }
    };
};

export const logoutuser = () => {
    return async (dispatch) => {
        ("first");
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/logout");
        const message = await res.json();
        window.location = "/landing";
        dispatch(userActions.logout());
    };
};


export const toggleFavorite = (item, user) => {
    return async (dispatch) => {
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/addfavorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ item: item, user: user })
        });
        const a = await res.json();

        dispatch(userActions.getFavorites({ favorites: a.favorites }));
    };
};


export const setRemindTime = (days, time, id, navToHome) => {
    return async (dispatch) => {
        dispatch(uiActions.showLoading());

        const remindTime = {
            days,
            time
        };
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/setremindme", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ remindTime, id })
        });
        const data = await res.json();
        dispatch(uiActions.unShowLoading());
        dispatch(userActions.setRemindTime(data));
        navToHome();
    };
};

