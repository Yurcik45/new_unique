import React, {useState} from "react";
import './ResetPassword'
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Footer from "../../../components/Footer/Footer";
import { mainPopup } from "../../../main";


const ResetPassword = (props: mainPopup) => {

    const [state] = useState<string | any>({email: ""})

    const handleOnChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        state[value.target.name] = value.target.value;
    }
    const onSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if ( state.email === "" && state.newPassword === "" ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'enter your Email and new Password'})
        } else if ( state.email === "" || undefined ) {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'enter your Email'})
        }  else {
            console.warn('user login state', state);
            // dispatch(loginUser(state));
        }
    }

    return (
        <div className="LoginPage">
            <div style={{height: 400}} className="loginContainer">
                <div className="loginImage">
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
                    <Button
                        uppercase={true}
                        width="100%"
                        value="send new password"
                        className="white"
                        mainButtonClicked={(event: React.MouseEvent<HTMLDivElement>) => onSubmit(event)}
                    />
            </div>
            <Footer/>
        </div>
    );
};

export default ResetPassword;
