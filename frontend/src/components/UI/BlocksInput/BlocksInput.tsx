import React, {useReducer} from 'react';
import './BlocksInput.sass'

interface BlockInput {
    width?: string,
    height?: string,
    backgroundColor?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    name?: string,
    type?: string,
    blockOnChange?: (value: string) => void,
    blockOnClick?: (e: any) => void,
    blockValues?: any | undefined,
    blockValuesHandler?: any,
    blockValuesArray?: any
}

const BlocksInput = (props: BlockInput) => {

    const deleteIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 8C16 12.422 12.4214 16 8 16C3.578 16 0 12.4214 0 8C0 3.578 3.57861 0 8 0C12.422 0 16 3.57861 16 8ZM14.75 8C14.75 4.26892 11.7306 1.25 8 1.25C4.26892 1.25 1.25 4.26941 1.25 8C1.25 11.7311 4.26941 14.75 8 14.75C11.7311 14.75 14.75 11.7306 14.75 8Z"
            fill="#C50000"/>
        <path
            d="M8.5497 7.99998L10.886 5.66363C11.038 5.51166 11.038 5.26595 10.886 5.11398C10.734 4.96201 10.4883 4.96201 10.3363 5.11398L7.99997 7.45033L5.66369 5.11398C5.51165 4.96201 5.266 4.96201 5.11403 5.11398C4.96199 5.26595 4.96199 5.51166 5.11403 5.66363L7.45032 7.99998L5.11403 10.3363C4.96199 10.4883 4.96199 10.734 5.11403 10.886C5.18977 10.9618 5.28935 10.9999 5.38886 10.9999C5.48837 10.9999 5.58788 10.9618 5.66369 10.886L7.99997 8.54964L10.3363 10.886C10.4121 10.9618 10.5116 10.9999 10.6112 10.9999C10.7107 10.9999 10.8102 10.9618 10.886 10.886C11.038 10.734 11.038 10.4883 10.886 10.3363L8.5497 7.99998Z"
            fill="#C50000"/>
    </svg>

    const styles = {
        width: props.width,
        height: props.height
    }

    // ------------------- BLOCK INPUT ADD ITEMS LOGIC ------------------- //
    //temporarily

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    // a method that implements the logic of adding and removing blocks
    const pushNewWord = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.keyCode === 32) {
            //@ts-ignore
            props.blockValues.push([e.target.name] = e.target.value);
            props.blockValuesHandler({})
            //@ts-ignore
            e.target.value = ''
            forceUpdate()
        }
        //@ts-ignore
        props.blockValuesHandler(props.blockValuesArray)
    }


    const deleteItem = (index: number) => {
        if (props.blockValuesArray !== undefined) {
            props.blockValuesArray.splice(index, 1);
            props.blockValuesHandler({});
            props.blockValuesHandler(props.blockValuesArray)
            forceUpdate()
        } else {
            console.log('ValuesArray is UNDEFINED')
        }
    }


    // ****************** BLOCK INPUT ADD ITEMS LOGIC END ****************** //


    return (
        <div className="MainBlockInputContainer">
            {
                props?.label ?
                    <label className="BlockInputLabel">
                        {props.label}
                    </label>
                    : null
            }
            <div style={styles} className="BlockInputContainer">
                {
                    props?.blockValuesArray ?
                        props.blockValuesArray.map((items: string, index: number) => {
                            return (
                                <div key={index} className="BlockInputItemsContainer">
                                    <div
                                        className="BlockInputItem"
                                        data-name={items}
                                    >{items}</div>
                                    <div
                                        onClick={() => deleteItem(index)}
                                        className="BlockInputIcon"
                                    >
                                        {deleteIcon}</div>
                                </div>
                            )
                        })
                        : null
                }
                <input
                    placeholder={props?.placeholder ? props.placeholder : "Input text"}
                    className={props?.className ? props.className : "BlockInput"}
                    type="text"
                    onKeyDown={(e) => pushNewWord(e)}
                    name={props?.name ? props.name : "testName"}
                />
            </div>
        </div>
    );
};

export default BlocksInput;