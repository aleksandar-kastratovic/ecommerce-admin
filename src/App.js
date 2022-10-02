import React from "react"
import { ThemeProvider } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { Flip, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ApplicationRouter from "./routes/ApplicationRouter"
import AuthContext from "./store/auth-contex"
import { useContext, useState, useEffect } from "react"
import SideNavigation from "./components/SideNavigation"
import Header from "./components/Header"
import useHttp from "./hooks/use-http"
import Loader from "./components/UI/Loader"
import { referenceDataService, refreshTokenService, userScreensService } from "./helpers/services"
import CroonusTheme from "./theme"

function App() {
    const queryClient = new QueryClient()
    const authCtx = useContext(AuthContext)
    let navigate = useNavigate()
    const { isLoading, sendRequest: referenceDataRequest } = useHttp()
    const { isLoading2, sendRequest: userScreenRequest } = useHttp()

    const [ sidenav, setSidenav ] = useState(true)
    const [ activeTheme, setActiveTheme ] = useState(
        localStorage.getItem("theme") === "true" ?? false
    )

    useEffect(() => {
        if (authCtx.isRefreshingToken) {
            const setUserData = (userData) => {
                const expirationTime = new Date(
                    new Date().getTime() + +userData.expires_in * 60 * 1000
                )

                authCtx.login(userData, expirationTime)
            }

            const refreshToken = async () => {
                const data = await refreshTokenService(referenceDataRequest)
                setUserData(data)
            }

            refreshToken()
        }
    }, [ authCtx.isRefreshingToken ])

    useEffect(() => {
        if (authCtx.isTokenExpired) {
            toast.warning("Istekao Vam je token!")
            authCtx.changeTokenExpired(false)
            navigate(`/`)
        }
    }, [ authCtx.isTokenExpired ])

    let routerClass
    if (!authCtx.isLoggedIn) {
        routerClass = ""
    } else if (sidenav) {
        routerClass = "side-open router-container"
    } else {
        routerClass = "router-container"
    }

    if (activeTheme && authCtx.isLoggedIn) {
        document.body.classList.add("theme-dark")
        document.body.classList.remove("theme-light")
    } else {
        document.body.classList.add("theme-light")
        document.body.classList.remove("theme-dark")
    }

    useEffect(() => {
        const setReferenceData = (referenceData) => {
            authCtx.getReferenceData(referenceData)
        }

        const setUserScreens = (userScreens) => {
            authCtx.getUserScreens(userScreens)
        }

        if (authCtx.isLoggedIn) {
            const referenceData = async () => {
                const data = await referenceDataService(referenceDataRequest)
                setReferenceData(data)
            }

            referenceData()

            const userScreens = async () => {
                const data = await userScreensService(userScreenRequest)
                setUserScreens(data)
            }

            userScreens()
        }
    }, [ referenceDataRequest, userScreenRequest, authCtx.isLoggedIn ])

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={CroonusTheme}>
                <div className={routerClass}>
                    {authCtx.isLoggedIn && (
                        <>
                            <SideNavigation
                                activeTheme={activeTheme}
                                userName={
                                    (authCtx.user.user.first_name ?? "") +
                                    " " +
                                    (authCtx.user.user.last_name ?? "")
                                }
                            />
                            <Header
                                openSidenav={() => setSidenav(!sidenav)}
                                activeTheme={activeTheme}
                                changeTheme={() => {
                                    setActiveTheme(!activeTheme)
                                    localStorage.setItem("theme", !activeTheme)
                                }}
                            />
                        </>
                    )}

                    {/* Main content */}
                    <div className={authCtx.isLoggedIn ? "main-wrapper" : ""}>
                        <ApplicationRouter />
                    </div>

                    {/* Toast */}
                    <ToastContainer
                        position="top-center"
                        theme="colored"
                        transition={Flip}
                        autoClose={800}
                        newestOnTop={false}
                        draggable={false}
                        closeOnClick
                        hideProgressBar
                        pauseOnHover />

                    {(isLoading || isLoading2) && <Loader />}
                </div>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
