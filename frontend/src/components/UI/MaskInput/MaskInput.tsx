import InputMask from "react-input-mask";
import {ForProps} from '../../../main'

const MaskInput = (props: ForProps) => {

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
            <InputMask
                className="MainInput"
                mask="+* (***) ***-****"
                name={props.name}
                placeholder="+1 (111) 111-1111"
                // alwaysShowMask = {true}
                onChange={(e) => props.mainInputEvent(e)}
            />
        </div>
    );
};

export default MaskInput;
