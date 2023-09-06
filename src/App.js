import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import ApplicationRouter from "./routes/ApplicationRouter";
import AuthContext from "./store/auth-contex";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNavigation from "./components/SideNavigation";
import Header from "./components/Header";
import Loader from "./components/shared/Loading/Loading";
import CroonusTheme from "./theme";
import useAPI from "./api/api";

const App = () => {
    const api = useAPI();

    const queryClient = new QueryClient();
    const authCtx = useContext(AuthContext);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [sidenav, setSidenav] = useState(true);
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem("theme") === "true" ?? false);

    useEffect(() => {
        //seting global api:
        authCtx?.setGlobalApiFile(api);
        if (authCtx.isRefreshingToken) {
            const refreshToken = async () => {
                if (authCtx?.api?.get) {
                    await authCtx?.api
                        .get(`admin/profile/refresh-token`)
                        .then((response) => {
                            const data = response?.payload;

                            if (!data) {
                                toast.warning("Greška!");
                            }

                            const expirationTime = new Date(new Date().getTime() + +data.expires_in * 1000);
                            authCtx.login(data, expirationTime);
                            authCtx?.api?.userDataUpdate(data);
                        })
                        .catch((error) => {
                            console.warn(error);
                            console.log(error?.response);
                        });
                }
            };

            refreshToken();
        }
    }, [authCtx?.isRefreshingToken, authCtx?.api]);

    useEffect(() => {
        if (authCtx.isTokenExpired) {
            // toast.warning("Istekao Vam je token!");
            authCtx.changeTokenExpired(false);
            // navigate(`/`);
        }
    }, [authCtx.isTokenExpired]);

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            // Update user data after login
            api.userDataUpdate(authCtx.user);

            const setUserScreens = (userScreens) => {
                authCtx.getUserScreens(userScreens);
            };

            const userScreens = async () => {
                if (authCtx?.api?.get) {
                    setIsLoading(true);
                    await authCtx?.api
                        .get(`admin/profile/user-permissions`)
                        .then((response) => {
                            const data = response?.payload;
                            if (!data) {
                                toast.warning("Greška!");
                            }

                            setUserScreens(response?.payload);
                        })
                        .catch((error) => {
                            console.warn(error);
                        });
                    setIsLoading(false);
                }
            };

            userScreens();
        }
    }, [authCtx.isLoggedIn, authCtx?.api]);

    let routerClass;
    if (!authCtx.isLoggedIn) {
        routerClass = "";
    } else if (sidenav) {
        routerClass = "side-open router-container";
    } else {
        routerClass = "router-container";
    }

    if (activeTheme && authCtx.isLoggedIn) {
        document.body.classList.add("theme-dark");
        document.body.classList.remove("theme-light");
    } else {
        document.body.classList.add("theme-light");
        document.body.classList.remove("theme-dark");
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={CroonusTheme}>
                <div className={routerClass}>
                    {authCtx.isLoggedIn && (
                        <>
                            <SideNavigation
                                openSidenav={() => setSidenav(!sidenav)}
                                activeTheme={activeTheme}
                                userName={(authCtx.user.user.first_name ?? "") + " " + (authCtx.user.user.last_name ?? "")}
                            />
                            <Header
                                openSidenav={() => setSidenav(!sidenav)}
                                activeTheme={activeTheme}
                                changeTheme={() => {
                                    setActiveTheme(!activeTheme);
                                    localStorage.setItem("theme", !activeTheme);
                                }}
                            />
                        </>
                    )}

                    {/* Main content */}
                    <div className={authCtx.isLoggedIn ? "main-wrapper" : ""}>
                        <ApplicationRouter />
                    </div>

                    {/* Toast */}
                    <ToastContainer position="top-center" theme="colored" transition={Flip} autoClose={800} newestOnTop={false} draggable={false} closeOnClick hideProgressBar pauseOnHover />

                    {isLoading && <Loader size={50} />}
                </div>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
