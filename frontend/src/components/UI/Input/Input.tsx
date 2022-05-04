import './Input.sass'
import {ForProps} from '../../../main'

const Input = ( props: ForProps ) => {

    // STYLES FOR CUSTOM INPUT CONTAINER
    const styles = {
        width: props.width,
        height: props.height
    }

    return (
        <div style={styles} className="MainInputContainer">
            {
                props.label ?
                    <label className="MainInputLabel">
                        {props.label}
                    </label>
                    : null
            }
            <input
                className={props.className ? props.className : "MainInput"}
                name={props?.name ? props.name : undefined}
                type={props?.type ? props.type : undefined}
                value={props?.value ? props.value : undefined}
                placeholder={props?.placeholder ? props.placeholder : undefined}
                autoComplete={props?.autoComplete ? props.autoComplete : "off"}
                onKeyDown={props?.mainInputKeyClickEvent ? (e) => props.mainInputKeyClickEvent(e) : undefined}
                onChange={props?.mainInputEvent ? (e) => props.mainInputEvent(e) : undefined}
                onClick={props?.mainInputClickEvent ? (e) => props.mainInputClickEvent(e) : undefined}
            />
        </div>
    );
};

export default Input;