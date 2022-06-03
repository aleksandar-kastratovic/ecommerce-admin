import singinBackground from "./../assets/images/signin-background.png";
import logo from "./../assets/images/login-logo.svg";
import Input from "./UI/Input";
import useInput from "../hooks/use-input";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-contex";
import { useContext, useState } from "react";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";
import { regax } from "../helpers/const";
import { forgotPasswordService, loginService } from "../helpers/services";
import ForgotPasswordModal from "./UI/ForgotPasswordModal";

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
        inputBlurHandler: emailBlurHandler
    } = useInput((value) => (!value && value.trim() !== '') || regex.test(value) !== false);

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler
    } = useInput((value) => value.trim() !== '');

    let formIsValid = false;

    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const setLoginData = (userData) => {
        const expirationTime = new Date(
            new Date().getTime() + +userData.expires_in * 1000
        );
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
            password: passwordValue
        };

        const data = await loginService(loignData, loginRequest);
        if (data) {
            setLoginData(data);
        };
    };

    const forgotPassword = async (mailData) => {
        await forgotPasswordService(mailData, loginRequest);
    }

    return (
        <div className="container-fluid signin-wrapper">
            <div className="row">
                <div className="col-7">
                    <img src={singinBackground} className="login-background-image" alt={singinBackground} />
                </div>
                <div className="col-5">
                    <div className="row login-form-container">
                        <img src={logo} alt={logo} />
                        <h5>Dobrodošli na Croonus CMS.</h5>
                        <p className="login-from-text">Molimo prijavite se za pristup administraciji.</p>
                        <form onSubmit={submitHandler} className="login-form">
                            <Input 
                                inputValue={emailValue}
                                onInputChange={emailChangeHandler}
                                onInputBlur={emailBlurHandler}
                                hasInputError={emailHasError}
                                disabled={false}
                                inputType="input"
                                type="text"
                                class={"form-control login-form-control form-control-lg " + (emailHasError ? 'invalid' : '')}
                                text="Email adresa"
                                text_class="m-0 required"
                            />
                            <Input 
                                inputValue={passwordValue}
                                onInputChange={passwordChangeHandler}
                                onInputBlur={passwordBlurHandler}
                                hasInputError={passwordHasError}
                                disabled={false}
                                inputType="input"
                                type="password"
                                class={"form-control login-form-control form-control-lg " + (passwordHasError ? 'invalid' : '')}
                                text="Lozinka"
                                text_class="m-0 required"
                                inputErrorText="je obavezna!"
                            />
                            {/* <Form.Group className="remember-checkbox" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Zapamti me na ovom uređaju." />
                            </Form.Group> */}
                            <button disabled={!formIsValid} className="button-outline-black btn-control" type="submit">
                                Prijavite se
                            </button>
                        </form>
                        <div className="login-form-links-wrapper">
                            {/* <a className="font-14" href="/">Zaboravili ste lozinku?</a> */}
                            <button type="button" className="btn-control auth-transparent-button" onClick={() => {setShow(true)}}>
                                Zaboravili ste lozinku?
                            </button>
                            {/* <p className="font-14">Ukoliko nemate nalog, <a href="/">pišite nam</a>.</p> */}
                        </div>
                        {isLoading && (
                            <Loader />
                        )}
                        <ForgotPasswordModal
                            openModal={show}
                            handleClose={() => {setShow(false)}}
                            forgotPassword={(dataForSave) => { forgotPassword(dataForSave); }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;