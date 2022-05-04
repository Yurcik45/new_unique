import * as React from "react";
import './Login.sass'
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Footer from "../../../components/Footer/Footer";
import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {loginUser} from '../../../redux/actions/auth'
import {useDispatch, useSelector} from 'react-redux'
import {googleAuthorize} from '../../../redux/actions/auth'
import { mainPopup } from "../../../main";


const Login = (props: mainPopup) => {



    console.log("props", props);
    

    //@ts-ignore
    const authData = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const [state] = useState<string | any>({email: "", password: ""})

    const googleIcon = <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.611 20.083H42V20H24V28H35.303C33.654 32.657 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z" fill="#FFC107"/>
    <path d="M6.306 14.691L12.877 19.51C14.655 15.108 18.961 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691Z" fill="#FF3D00"/>
    <path d="M24 44C29.166 44 33.86 42.023 37.409 38.808L31.219 33.57C29.1436 35.1484 26.6075 36.0021 24 36C18.798 36 14.381 32.683 12.717 28.054L6.19501 33.079C9.50501 39.556 16.227 44 24 44Z" fill="#4CAF50"/>
    <path d="M43.611 20.083H42V20H24V28H35.303C34.5142 30.2164 33.0934 32.1532 31.216 33.571L31.219 33.569L37.409 38.807C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083Z" fill="#1976D2"/>
    </svg>
    
    const googleAuth = () => {
        dispatch(googleAuthorize())
    }

    const handleOnChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        state[value.target.name] = value.target.value;
    }


    const onSubmit = () => {
        if ( state.email === "" && state.password === "" ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Заполните все поля'})
        } else if ( state.email === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Введите емейл'})
        } else if ( state.password === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Введите пароль'})
        } else {
            dispatch(loginUser(state));
        }
    }

    const loginUserFunction = (event: React.KeyboardEvent<HTMLDivElement>) => {
        //@ts-ignore
        if (event.keyCode === 13) {
            //@ts-ignore
            onSubmit()
        }
    }

    return (
        <div className="LoginPage">
            <div className="loginContainer">

                <div className="loginImage"></div>

                <div className="loginInputContainer">
                    <Input
                        className="MainInput"
                        placeholder="Check you email"
                        width="100%"
                        type="text"
                        name="email"
                        autoComplete="no"
                        label="Email"
                        mainInputKeyClickEvent={(event: React.KeyboardEvent<HTMLDivElement>) => loginUserFunction(event)}
                        mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => handleOnChange(value)}
                    />
                    <Input
                        className="MainInput"
                        placeholder="Write password"
                        width="100%"
                        type="password"
                        name="password"
                        autoComplete="no"
                        label="Password"
                        mainInputKeyClickEvent={(event: React.KeyboardEvent<HTMLDivElement>) => loginUserFunction(event)}
                        mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => handleOnChange(value)}
                    />
                </div>



                <div className="loginGoogleContainer" onClick={googleAuth}>
                    <div className="googleText">or</div>
                    <div className="googleIcon">{googleIcon}</div>
                    <div className="googleText">authorize</div>

                </div>


                <div className="forgotPassAndRegister">
                    <NavLink className="navLink" to={'/password_reset'}>
                        <div
                            className="forgotText">
                            Forgot password?
                        </div>
                    </NavLink>
                    <NavLink className="navLink" to={'/register'}>
                        <div
                            className="registerText">
                            Register
                        </div>
                    </NavLink>
                </div>
                <div className="additionalTextContainer">
                    <div className="additionalText">
                        By continuing, I accept the
                        <div className="additionalTextBlue">Terms of Use</div>
                        and have read
                    </div>
                    <div className="additionalText">
                        and understood the
                        <div className="additionalTextBlue">Privacy Policy</div>
                    </div>
                </div>
                <div className="LoginButtonContainer">
                    <Button
                        uppercase={true}
                        buttonType="login"
                        value="login"
                        className="white"
                        mainButtonClicked={() => onSubmit()}
                        width="calc(100% - 40px)"
                    />
                </div>
            </div>
            {/* <NotificationPopup
                value={popupSettings.value}
                type={popupSettings.type}
                popup={popup}
                setPopup={setPopup}
            /> */}
            <Footer/>
        </div>
    );
};

export default Login;