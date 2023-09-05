import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import DeleteModal from "../components/shared/Dialogs/DeleteDialog";
import { set } from "lodash";
import useAPI from "../api/api";

let logoutTimer;
let refreshTokenTimer;
let showModalTimer;

const AuthContext = React.createContext({
    user: [],
    userScreens: [],
    isLoggedIn: false,
    isTokenExpired: false,
    isRefreshingToken: false,
    startScreen: null,
    login: (user) => {},
    logout: () => {},
    getUserScreens: (userScreens) => {},
    changeTokenExpired: (tokenExpired) => {},
});
const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    // const remainingDuration = 10000;
    return remainingDuration;
};

const calculateTokenRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime - 300000;

    return remainingDuration;
};

const retrieveStoredUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedExpirationDate = localStorage.getItem("expirationTime");

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    return {
        user: storedUser,
        duration: remainingTime,
    };
};

export const AuthContextProvider = (props) => {
    let userData = retrieveStoredUser();
    const [tokenExpired, setTokenExpired] = useState(false);
    const [showTokenExpiryModal, setShowTokenExpiryModal] = useState(false);
    const api = useAPI();

    if (userData.duration <= 10000 && userData.user) {
        localStorage.removeItem("user");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("lastHttp");
        setTokenExpired(true);
        userData = null;
    }

    let initialUser;
    if (userData) {
        initialUser = userData.user;
    }

    const [user, setUser] = useState(initialUser);
    const [userScreensData, setUserScreensData] = useState([]);
    const [refreshingToken, setRefreshingToken] = useState(false);
    const [startScreenData, setStartScreenData] = useState(null);

    const userIsLoggedIn = !!user && !!user.access_token;

    const logoutHandler = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("lastHttp");
        localStorage.removeItem("openGroups");

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        if (refreshTokenTimer) {
            clearTimeout(refreshTokenTimer);
        }

        setStartScreenData(null);
    }, []);

    const loginHandler = (user, expirationTime) => {
        setUser(user);
        setRefreshingToken(false);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("user", JSON.stringify(user));

        const remainingTime = calculateRemainingTime(expirationTime);
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        logoutTimer = setTimeout(logoutHandler, remainingTime);

        const remainingTokenTime = calculateTokenRemainingTime(expirationTime);

        if (refreshTokenTimer) {
            clearTimeout(refreshTokenTimer);
        }
        refreshTokenTimer = setTimeout(refreshToken, remainingTokenTime);

        setStartScreenData(user?.user?.start_screen_code ?? "");
    };

    const refreshToken = useCallback(() => {
        const storedExpirationDate = localStorage.getItem("expirationTime");
        const remainingTime = calculateRemainingTime(storedExpirationDate);
        if (remainingTime <= 5000) {
            return;
        }

        const storedLastHttp = localStorage.getItem("lastHttp");
        const storedLastHttpMs = new Date(storedLastHttp).getTime();
        const tokenExpiringTimeMs = new Date(storedExpirationDate).getTime();

        if (3000000 >= tokenExpiringTimeMs - storedLastHttpMs) {
            setRefreshingToken(true);
        } else {
            if (refreshTokenTimer) {
                clearTimeout(refreshTokenTimer);
            }
            refreshTokenTimer = setTimeout(refreshToken, 60000);
        }
    }, []);

    useEffect(() => {
        if (userData?.user) {
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
            logoutTimer = setTimeout(logoutHandler, userData.duration);

            const storedExpirationDate = localStorage.getItem("expirationTime");
            const remainingTokenTime = calculateTokenRemainingTime(storedExpirationDate);

            if (refreshTokenTimer) {
                clearTimeout(refreshTokenTimer);
            }
            refreshTokenTimer = setTimeout(refreshToken, remainingTokenTime);
            let modalShowTime = remainingTokenTime - 300000;

            showModalTimer = setTimeout(() => {
                setShowTokenExpiryModal(true);
            }, 5000);

            return () => {
                clearTimeout(showModalTimer);
            };
        }
    }, [userData, logoutHandler, refreshToken]);

    const userScreensHandler = (userScreens) => {
        setUserScreensData(userScreens);
    };
    const setIsTokenExpiring = (tokenExpired) => {
        setTokenExpired(tokenExpired);
    };

    const contextValue = {
        user: user,
        isLoggedIn: userIsLoggedIn,
        isTokenExpired: tokenExpired,
        isRefreshingToken: refreshingToken,
        userScreens: userScreensData,
        startScreen: startScreenData,
        login: loginHandler,
        logout: logoutHandler,
        getUserScreens: userScreensHandler,
        changeTokenExpired: setIsTokenExpiring,
    };

    return (
        <>
            <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

            <DeleteModal
                title="Obaveštenje"
                openDeleteDialog={{ show: false }}
                // openDeleteDialog={{ show: false }}
                nameOfButtonCancel="Nastavi"
                nameOfButton="Odjavite se"
                deafultDeleteIcon={false}
                description={`Vaš token ističe za 5 minuta.`}
                handleConfirm={() => {
                    logoutHandler();
                    setShowTokenExpiryModal(false);
                }}
                styleButtonCancel={{ color: "#28a86e", borderColor: "rgba(40, 168, 110, 0.5)", "&:hover": { backgroundColor: "rgba(40, 168, 110, 0.04)", borderColor: "#28a86e" } }}
                //sx={{ backgroundColor: "#28a86e", "&:hover": { backgroundColor: "rgb(28, 117, 77)" } }}
                handleCancel={() => {
                    setShowTokenExpiryModal(false);
                    setRefreshingToken(true);
                }}
                handleCancelToken={true}
            />
        </>
    );
};

export default AuthContext;
