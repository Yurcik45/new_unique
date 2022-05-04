import React, {useState} from 'react';
import './Register.sass';
import Input from "../../../components/UI/Input/Input";
import Footer from "../../../components/Footer/Footer";
import Button from "../../../components/UI/Button/Button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { mainPopup } from "../../../main";


const Register = (props: mainPopup) => {

    let history = useHistory();
    const [state] = useState<string | any>({email: "", password: "", passwordConfirm: ""});


    const registerUser = (userInfo: any) => {
        const email = userInfo.email;
        const password = userInfo.password
        const is_active =  true;
        const is_superuser =  false;
        const is_verified =  false;

        const config = {headers: {"Content-Type": "application/json"}}
        const requestUrl = 'http://localhost:8000/auth/register';
        const body = JSON.stringify({email, password, is_active, is_superuser, is_verified})

        axios.post(requestUrl, body, config)
            .then(function (response) {
                console.log(response.statusText);
                props.setPopup(true)
                props.setPopupSettings({type: 'success',value: 'Регистрация успешна'})
                history.push("/login")
            })
            .catch(function (error) {
                if (error?.response === undefined) {
                    console.log("NEW ERROR", error.response === undefined);
                    props.setPopup(true)
                    props.setPopupSettings({type: 'danger',value: 'Проблемы с интеренет-соединением'})
                } else if (error.response.data.detail === "REGISTER_USER_ALREADY_EXISTS") {
                    props.setPopup(true)
                    props.setPopupSettings({type: 'success',value: 'Пользователь уже зарегестрирован'})
                    setTimeout(() => { history.push("/login") }, 1000)
                } else if (error.response.data.detail[0].msg === "value is not a valid email address") {
                    props.setPopup(true)
                    props.setPopupSettings({type: 'danger',value: 'Введите корректный емейл'})
                } else {
                    console.log("other error", error.response);
                    
                }
            });
    };

    const handleOnChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        state[value.target.name] = value.target.value
    };
    const onSubmit = () => {
        if ( state.email === "" && state.password === "" && state.passwordConfirm === "") {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Заполните все поля'})
        } else if ( state.email === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Введите емейл'})
        } else if ( state.password === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Придумайте пароль'})
        } else if ( state.passwordConfirm === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Подтвердите пароль'})
        } else if ( state.password !== state.passwordConfirm ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Пароли не совпадают'})
        } else {
            let resultState = {
                email: state.email,
                password: state.password
            }
            registerUser(resultState)
        }
    };

    const loginUserFunction = (event: React.KeyboardEvent<HTMLDivElement>) => {
        //@ts-ignore
        if (event.keyCode === 13) {
            //@ts-ignore
            onSubmit()
        }
    }

    return (
        <div className="RegisterPage">
            <div className="registerContainer">
                <div className="registerImage"/>
                <div className="welcomeText">
                    Nice to meet you
                    <div className="additionalWelcomeText">
                        Create account by completing the registration form below
                    </div>
                </div>
                    <Input
                        className="MainInput"
                        placeholder="Check you email"
                        width="100%"
                        type="text"
                        name="email"
                        autoComplete="no"
                        label="Email"
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
                    <Input
                        className="MainInput"
                        placeholder="Confirm password"
                        width="100%"
                        type="password"
                        name="passwordConfirm"
                        autoComplete="no"
                        label="Confirm password"
                        mainInputKeyClickEvent={(event: React.KeyboardEvent<HTMLDivElement>) => loginUserFunction(event)}
                        mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => handleOnChange(value)}
                    />
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
                    <Button
                        uppercase={true}
                        buttonType="reg"
                        value="register"
                        className="green"
                        mainButtonClicked={() => onSubmit()}
                    />
            </div>
            <Footer/>
        </div>
    );
};

export default Register;
