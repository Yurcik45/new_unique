import {useState} from 'react';
import './CustomSelect.sass';
import {ClickAwayListener} from "@material-ui/core";


interface CustomSelectProps {
    width?: string,
    height?: string,
    backgroundColor?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    name?: string,
    type?: string,
    textColor?: string
    icon?: any
    selectedStandard?: string,
    selectedOptions?: string[] | any ,
    selectOnChange?: (value: string) => void,
    selectOnClick?: (e: any) => void,
    selectValues?: any | undefined,
    selectValuesHandler?: any,
    optionValue?: {
        icon: JSX.Element | undefined,
        country: string | undefined
    } | any,
    // setOptionValue?: (optionValue: string) => void
    setOptionValue?: any
}


const CustomSelect = (props: CustomSelectProps) => {

    const [showOptions,setShowOptions] = useState<boolean>(false)

    const clickedArrowStyle = {transform: "rotate(180deg)", transition: ".4s"}
    const clossedArrowStyle = {transform: "rotate(0deg)", transition: ".4s"}


    const downArrow = <svg style={ showOptions ? clickedArrowStyle : clossedArrowStyle } width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path d="M11.8534 2.89662C11.6579 2.70113 11.3419 2.70113 11.1464 2.89662L5.99998 8.04301L0.853593 2.89662C0.658105 2.70113 0.342104 2.70113 0.146616 2.89662C-0.048872 3.0921 -0.048872 3.40811 0.146616 3.60359L5.64651 9.10348C5.744 9.20098 5.87199 9.24999 6.00001 9.24999C6.12802 9.24999 6.25601 9.20098 6.35351 9.10348L11.8534 3.60359C12.0489 3.40811 12.0489 3.0921 11.8534 2.89662Z" fill="#48519D"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="12" height="12" fill="white"/>
            </clipPath>
        </defs>
    </svg>;

    const styles = {
        width: props.width,
        height: props.height,
        color: props.textColor
    }



    const setOption = (option: string) => {
        props.setOptionValue(option)
        closeOptions()
    }

    const closeOptions = () => {
        setShowOptions(false)
    }

    // setTimeout(() => {
    //     if (showOptions) {
    //         closeOptions()
    //     }
    // }, 7000)


    return (
        <div style={{width: props?.width ? props.width : "100%"}} className="MainSelectContainer" onClick={() => setShowOptions(!showOptions)}>
            {
                props.label ?
                    <label className="MainSelectLabel">
                        {props.label}
                    </label>
                    : null
            }
            <div style={styles} className="selectBlock">
                    <div className="selectedText">
                        {props.optionValue.icon ? props.optionValue.icon : props.icon}
                        {props.optionValue?.item ? props.optionValue.item : props.selectedStandard}
                    </div>
                {downArrow}
            </div>
            {
                showOptions ?
                    <ClickAwayListener onClickAway={() => setShowOptions(false)}>
                        <div 
                            style={{
                                width: props?.width ? `calc(${props.width} - 2px)` : "100%",
                                minHeight: props.selectedOptions.length * 30
                            }}
                            className="selectOptionsContainer"
                        >
                            {
                                props?.selectedOptions ?
                                    props.selectedOptions.map( (opt: {icon: JSX.Element, item: string}, id: number) => {
                                        return (
                                            //@ts-ignore
                                            <div key={id} className="selectItem" onClick={() => setOption({icon: opt.icon, item: opt.item})}>
                                                <div className="selectItemIcon">
                                                    {
                                                        opt.icon === null || undefined
                                                            ? opt
                                                            : opt.icon
                                                    }
                                                </div>
                                                <div className="selectItemText">
                                                    {
                                                        opt.item === null || undefined
                                                            ? opt
                                                            : opt.item
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                    </ClickAwayListener>
                    : null
            }
        </div>
    );
}

export default CustomSelect;