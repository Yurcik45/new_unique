import * as React from 'react';
import './Hello.sass';
import Footer from "../../../components/Footer/Footer";
import Button from "../../../components/UI/Button/Button";
import {NavLink} from "react-router-dom";

const Hello = () => {

    return (
        <div className="HelloPage">
            <div className="helloContainer">
                <div className="helloImage">
                </div>
                <div className="helloLoginButtonContainer">
                    <NavLink
                        to={'/login'}
                    >
                        <Button
                            uppercase={true}
                            buttonType="login"
                            value="login"
                            className="white"
                            width="calc(100% - 55px)"
                        />
                    </NavLink>
                </div>
                <div className="helloRegisterButtonContainer">
                    <NavLink
                        to={'/register'}
                    >
                        <Button
                            uppercase={true}
                            buttonType="reg"
                            value="register"
                            className="green"
                            width="calc(100% - 55px)"
                        />
                    </NavLink>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Hello;
