import singinBackground from "./../assets/images/signin-background.png";
import logo from "./../assets/images/login-logo.svg";
import Input from "./UI/Input";
import useInput from "../hooks/use-input";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";
import { regax } from "../helpers/const";
import { resetPasswordService } from "../helpers/services";

const ResetForm = () => {
    let { token } = useParams();
    const { isLoading, sendRequest: resetRequest } = useHttp();
    const regex = regax;
    let navigate = useNavigate();

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

    const {
        value: passwordConfirmValue,
        isValid: passwordConfirmIsValid,
        hasError: passwordConfirmHasError,
        valueChangeHandler: passwordConfirmChangeHandler,
        inputBlurHandler: passwordConfirmBlurHandler
    } = useInput((value) => value === passwordValue);

    let formIsValid = false;

    if (emailIsValid && passwordIsValid && passwordConfirmIsValid) {
        formIsValid = true;
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!formIsValid) {
            toast.warning("Forma nije validna!");
            return;
        }

        if (!token || token.trim() === '') {
            toast.warning("URL ne sadrži token. Molimo Vas upotrebite validan URL iz mail-a!");
            return;
        }

        const resetData = {
            email: emailValue,
            password: passwordValue,
            password_confirmation: passwordConfirmValue,
            token: token
        };

        const data = await resetPasswordService(resetData, resetRequest);
        if (data) {
            navigate(`/`);
        };
    };

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
                        {/* <p className="login-from-text">Molimo prijavite se za pristup administraciji.</p> */}
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
                                offAutoComplete={true}
                                inputType="input"
                                type="password"
                                class={"form-control login-form-control form-control-lg " + (passwordHasError ? 'invalid' : '')}
                                text="Lozinka"
                                text_class="m-0 required"
                                inputErrorText="je obavezna!"
                            />
                            <Input 
                                inputValue={passwordConfirmValue}
                                onInputChange={passwordConfirmChangeHandler}
                                onInputBlur={passwordConfirmBlurHandler}
                                hasInputError={passwordConfirmHasError}
                                disabled={false}
                                offAutoComplete={true}
                                inputType="input"
                                type="password"
                                class={"form-control login-form-control form-control-lg " + (passwordConfirmHasError ? 'invalid' : '')}
                                text="Potvrdite lozinku"
                                text_class="m-0 required"
                                inputErrorText="je obavezno!"
                            />
                            <button disabled={!formIsValid} className="button-outline-black btn-control" type="submit">
                                Restartujte
                            </button>
                        </form>
                        <div className="login-form-links-wrapper">
                            {/* <a className="font-14" href="/">Zaboravili ste lozinku?</a> */}
                            <button type="button" className="btn-control auth-transparent-button" onClick={() => {navigate(`/`);}}>
                                Prijavite se?
                            </button>
                            {/* <p className="font-14">Ukoliko nemate nalog, <a href="/">pišite nam</a>.</p> */}
                        </div>
                        {isLoading && (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetForm;