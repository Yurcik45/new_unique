import {useState} from "react"
import './NotificationPopup.sass';
import {mainPopup} from '../../main'

interface popupProps {
    value?: string,
    type?: string, // danger success
    popup?: boolean,
    setPopup?: any
}

const NotificationPopup = (props : mainPopup) => {

    const[active, setActive] = useState<boolean>(false)
    const[activePopup, setActivePopup] = useState<boolean>(false)
    const[disablePopup, setDisablePopup] = useState<boolean>(false)

    if (props.popup === true && disablePopup === false) {
        window.scrollTo(0,0)
        setTimeout(() => {
            setDisablePopup(true)
            setActive(true)
        }, 1)
        setTimeout(() => {
            setActivePopup(true)
        }, 500)
        setTimeout(() => {
            props.setPopupSettings({type: null, value: null})
            props.setPopup(false)
            setActivePopup(false)
            setTimeout(() => {
                setActive(false)
                setDisablePopup(false)
            }, 1000)       
        }, 2500)
    }
    return (
        //@ts-ignore
        <div className={
            active
            ? "NotificationPopupContainer activator"
            : "NotificationPopupContainer"
        }>
            <div
                className={
                    props.popupSettings.type === "danger" 
                        ? activePopup ? "DangerPopup" : "DangerPopup Transform"
                        : activePopup ? "SuccessPopup" : "SuccessPopup Transform"
                }
            >
                {props.popupSettings.value}
            </div>
        </div>
    )
};

export default NotificationPopup;
