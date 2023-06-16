import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import singinBackground from "./../assets/images/signin-background.png";
import logo from "./../assets/images/login-logo.svg";
import useInput from "../hooks/use-input";
import AuthContext from "../store/auth-contex";
import { regax } from "../helpers/const";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useAPI from "../api/api";
import Form from "../components/shared/Form/Form";
import fields from "../pages/loginFields.json";

const LoginPage = () => {
    const api = useAPI();
    const apiPath = "admin/sign-in/login";

    const init = {
        email: null,
        password: null,
    };

    const authCtx = useContext(AuthContext);
    const regex = regax;
    const [show, setShow] = useState(false);

    const [data, setData] = useState(init);
    const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);
    const navigate = useNavigate();

    const setLoginData = (userData) => {
        const expirationTime = new Date(new Date().getTime() + +userData.expires_in * 1000);
        authCtx.login(userData, expirationTime);
        navigate(`/`);
    };

    const submitHandler = async (data) => {
        setIsLoadingOnSubmit(true);
        await api
            .post(apiPath, data)
            .then((response) => {
                console.log(response);
                if (response?.payload?.user?.id) {
                    setLoginData(response.payload);
                }
                toast.success(`Uspešno`);
                setIsLoadingOnSubmit(false);
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
                setIsLoadingOnSubmit(false);
            });
    };

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
                            <Form formFields={fields} initialData={data} onSubmit={submitHandler} isLoading={isLoadingOnSubmit} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
