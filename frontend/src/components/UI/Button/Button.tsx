import React from 'react';
import './Button.sass'
import {ForProps} from "../../../main";

const Button = ( props: ForProps ) => {

    const buttonStyles = {
            width: props.width,
            minWidth: props.minWidth,
            height: props.height,
            minHeight: props.minHeight,
            maxHeight: props.maxHeight,
            textTransform: props.uppercase ? 'uppercase' : null,
            color: props.color,
            fontSize: props.fontSize,
            border: props.border,
            borderRadius: props.borderRadius
    }


    return (
        <button
            ref={props.ref}
            //@ts-ignore
            style = {buttonStyles}
            className = { props?.className ? props.className + " Button" : "Button" }
            disabled = {props.disabled}
            onClick={
                props?.mainButtonClicked ?
                    ((e) => props.mainButtonClicked(e))
                    : undefined
            }
        >
            {
                props.buttonIcon ?
                    <div className="buttonIcon">
                        {props.buttonIcon}
                    </div>
                : null
            }
            {props.value}
        </button>
    );
}

export default Button;
