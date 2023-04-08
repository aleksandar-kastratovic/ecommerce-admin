import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import singinBackground from "./../assets/images/signin-background.png";
import logo from "./../assets/images/login-logo.svg";
import Input from "./UI/Input";
import useInput from "../hooks/use-input";
import AuthContext from "../store/auth-contex";
import useHttp from "../hooks/use-http";
import Loader from "./shared/Loading/Loading";
import { regax } from "../helpers/const";
import { forgotPasswordService, loginService } from "../helpers/services";
import ForgotPasswordModal from "./UI/ForgotPasswordModal";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const AuthForm = () => {
    const { isLoading, sendRequest: loginRequest } = useHttp();
    const { login } = useContext(AuthContext);
    const regex = regax;
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => (!value && value.trim() !== "") || regex.test(value) !== false);

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim() !== "");

    let formIsValid = false;

    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const setLoginData = (userData) => {
        const expirationTime = new Date(new Date().getTime() + +userData.expires_in * 1000);
        login(userData, expirationTime);
        navigate(`/`);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!formIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }

        const loignData = {
            email: emailValue,
            password: passwordValue,
        };

        const data = await loginService(loignData, loginRequest);

        if (data) {
            setLoginData(data);
        }
    };

    const forgotPassword = async (mailData) => {
        await forgotPasswordService(mailData, loginRequest);
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                overflow: "auto",
            }}
        >
            <Grid container sx={{ height: "100%" }}>
                <Grid
                    item
                    md={12}
                    lg={7}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "var(--login-img-background)",
                    }}
                >
                    <img src={singinBackground} alt={singinBackground} style={{ maxHeight: "100%", width: "100%" }} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={5}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "center", md: "start" },
                        justifyContent: "center",
                        padding: { xs: "2rem", md: "0 3rem", lg: "0 5rem" },
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                        <img src={logo} alt={logo} width="90%" />
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "600",
                                paddingTop: "3rem",
                                fontSize: "1.6875rem",
                            }}
                        >
                            Dobrodošli na Croonus CMS.
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
                            Molimo prijavite se za pristup administraciji.
                        </Typography>
                        <Box sx={{ maxWidth: "28.125rem" }}>
                            <Box onSubmit={submitHandler} component="form" sx={{ display: "flex", flexDirection: "column" }}>
                                <Input
                                    inputValue={emailValue}
                                    onInputChange={emailChangeHandler}
                                    onInputBlur={emailBlurHandler}
                                    hasInputError={emailHasError}
                                    disabled={false}
                                    inputType="input"
                                    type="text"
                                    text="Email adresa"
                                />
                                <Input
                                    inputValue={passwordValue}
                                    onInputChange={passwordChangeHandler}
                                    onInputBlur={passwordBlurHandler}
                                    hasInputError={passwordHasError}
                                    disabled={false}
                                    inputType="input"
                                    type="password"
                                    text="Lozinka"
                                    inputErrorText="Lozinka je obavezna!"
                                />
                                <Button disabled={!formIsValid} type="submit" className="buttonLogin">
                                    {isLoading ? <Loader size={20} sx={{ color: "white" }} /> : "Prijavite se"}
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    mt: 2,
                                }}
                            >
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setShow(true);
                                    }}
                                    sx={{
                                        backgroundColor: "transparent",
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 0, 0, 0)",
                                        },
                                        textTransform: "none",
                                        padding: "0",
                                        fontWeight: "600",
                                        color: "inherit",
                                    }}
                                >
                                    Zaboravili ste lozinku?
                                </Button>
                            </Box>

                            <ForgotPasswordModal
                                openModal={show}
                                handleClose={() => {
                                    setShow(false);
                                }}
                                forgotPassword={(dataForSave) => {
                                    forgotPassword(dataForSave);
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AuthForm;
