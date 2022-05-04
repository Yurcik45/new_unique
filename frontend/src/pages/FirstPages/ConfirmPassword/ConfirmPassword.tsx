import React, {useState} from "react";
import './ConfirmPassword'
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Footer from "../../../components/Footer/Footer";
import { mainPopup } from "../../../main";


const ConfirmPassword = (props: mainPopup   ) => {

    const [state] = useState<string | any>({password: "", passwordConfirm: ""})

    const handleOnChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        state[value.target.name] = value.target.value;
    }
    const onSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if ( state.password === "" && state.passwordConfirm === "" ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'enter new Password and confirm Password'})
        } else if ( state.password === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'enter new Password'})
        }else if ( state.passwordConfirm === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'confirm your Password'})
        } else {
            console.warn('user login state', state);
            // dispatch(loginUser(state));
        }
    }

    return (
        <div className="LoginPage">
            <div className="loginContainer">
                <div className="loginImage">
                </div>
                <div className="loginInputContainer">
                    <Input
                        className="MainInput"
                        placeholder="Made new password"
                        type="password"
                        name="password"
                        autoComplete="no"
                        label="Password"
                        mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => handleOnChange(value)}
                    />
                </div>
                <div className="loginInputContainer">
                    <Input
                        className="MainInput"
                        placeholder="Confirm password"
                        type="password"
                        name="passwordConfirm"
                        autoComplete="no"
                        label="Confirm password"
                        mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => handleOnChange(value)}
                    />
                </div>
                <div className="LoginButtonContainer">
                    <Button
                        uppercase={true}
                        value="change password"
                        className="white"
                        mainButtonClicked={(event: React.MouseEvent<HTMLDivElement>) => onSubmit(event)}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ConfirmPassword;
