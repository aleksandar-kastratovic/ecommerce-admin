import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

let logoutTimer;
let refreshTokenTimer;

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
    const [refData, setRefData] = useState([]);
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
        if (userData) {
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

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
