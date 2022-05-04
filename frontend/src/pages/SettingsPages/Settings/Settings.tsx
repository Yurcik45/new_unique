import React, {useState} from 'react';
import './Settings.sass'
import Input from "../../../components/UI/Input/Input";
import Button from '../../../components/UI/Button/Button';
import CustomSelect from "../../../components/UI/CustomSelect/CustomSelect";

const Settings = () => {

    // Email Notifications DATA ARRAY


    // ------------------- REPORTS BUTTON STATE AND STYLES ------------------- //

    const[reportButton, reportButtonSet]= useState<boolean>(true);
    const[sendButton, sendButtonSet]= useState<boolean>(false);

    const[range, setRange] = useState<string[]>([])
    const option = [{item: 'day'}, {item: 'week'}, {item: 'month'}, {item: 'year'}]


    const reportButtonStatus = () => {
        reportButtonSet(!reportButton)
    }
    const sendButtonStatus = () => {
        sendButtonSet(!sendButton)
    }
    const stylesOff: any = {
        color: "white"
    }

    const stylesOn: any = {
        color: "#909090",
        backgroundColor: "white",
        boxShadow: "none"
    }

    const disabledButtonOn: any = {
        backgroundColor: "#900000",
        color: "white"
    }

    // ****************** REPORTS BUTTON STATE AND STYLES ****************** //


    const deleteIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 8C16 12.422 12.4214 16 8 16C3.578 16 0 12.4214 0 8C0 3.578 3.57861 0 8 0C12.422 0 16 3.57861 16 8ZM14.75 8C14.75 4.26892 11.7306 1.25 8 1.25C4.26892 1.25 1.25 4.26941 1.25 8C1.25 11.7311 4.26941 14.75 8 14.75C11.7311 14.75 14.75 11.7306 14.75 8Z"
            fill="#C50000"/>
        <path
            d="M8.5497 7.99998L10.886 5.66363C11.038 5.51166 11.038 5.26595 10.886 5.11398C10.734 4.96201 10.4883 4.96201 10.3363 5.11398L7.99997 7.45033L5.66369 5.11398C5.51165 4.96201 5.266 4.96201 5.11403 5.11398C4.96199 5.26595 4.96199 5.51166 5.11403 5.66363L7.45032 7.99998L5.11403 10.3363C4.96199 10.4883 4.96199 10.734 5.11403 10.886C5.18977 10.9618 5.28935 10.9999 5.38886 10.9999C5.48837 10.9999 5.58788 10.9618 5.66369 10.886L7.99997 8.54964L10.3363 10.886C10.4121 10.9618 10.5116 10.9999 10.6112 10.9999C10.7107 10.9999 10.8102 10.9618 10.886 10.886C11.038 10.734 11.038 10.4883 10.886 10.3363L8.5497 7.99998Z"
            fill="#C50000"/>
    </svg>


    // ------------------- WHITELIST ADD ITEMS LOGIC ------------------- //

    const[inpWhitelistValue, inpWhitelistValueHandler] = useState<object | null>({})
    const[inpWhitelistArray] = useState<string[]>(['ipadinsight.com/apple-news'])

    const pushNewWhitelistItem = (event: React.MouseEvent<HTMLButtonElement>) => {
        //@ts-ignore
        inpWhitelistValueHandler(inpWhitelistValue)
        //@ts-ignore
        inpWhitelistArray.push(inpWhitelistValue)
        inpWhitelistValueHandler(null)
        // event.target.value = ''
    }

    const inpWhitelistFunc = (value: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        inpWhitelistValueHandler(value.target.value)
        if (inpWhitelistValue === null) {
            value.target.value = ''
        }
        console.log('input worked', value.target.value)
    }

    const deleteWhitelistItem = (id: number) => {
        inpWhitelistArray.splice(id, 1)
        inpWhitelistValueHandler({})
    }

    // ****************** WHITELIST ADD ITEMS LOGIC END ****************** //




    // ------------------- CHANGE PASS ADD ITEMS LOGIC ------------------- //

    const[inputPassChange, inputPassChangeHandler] = useState<object | string | null>({})
    const[inputPassChangeArray] = useState<string[]>([])

    const changePassInput = (value: React.ChangeEvent<HTMLInputElement>) => {
        // inputPassChangeHandler(value.target.value)
        //@ts-ignore
        inputPassChange[value.target.name] = value.target.value
    }

    const selectUserData = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('clicked')
    }

    const clickChangePassword = (event: React.MouseEvent<HTMLDivElement>) => {
        // console.log('clickChangePassword')
        //@ts-ignore
        inputPassChangeHandler(inputPassChange)
        //@ts-ignore
        inputPassChangeArray.push(inputPassChange)
        inputPassChangeHandler({})
        //@ts-ignore
        event.target.value = ''
    }

    console.log('inputPassChangeArray', inputPassChangeArray)

    // ****************** CHANGE PASS ADD ITEMS LOGIC END ****************** //


    // ------------------- CHANGE EMAIL ADD ITEMS LOGIC ------------------- //

    const[inputEmailChange, inputEmailChangeHandler] = useState<object | string | null>({})
    const[inputEmailChangeArray] = useState<string[]>([])


    const changeEmailInput = (value: React.ChangeEvent<HTMLInputElement>) => {
        // inputPassChangeHandler(value.target.value)
        //@ts-ignore
        inputEmailChange[value.target.name] = value.target.value
    }

    const clickChangeEmail = (event: React.MouseEvent<HTMLDivElement>) => {
        //@ts-ignore
        inputEmailChangeHandler(inputEmailChange)
        //@ts-ignore
        inputEmailChangeArray.push(inputEmailChange)
        inputEmailChangeHandler({})
        //@ts-ignore
        event.target.value = ''
    }

    console.log('inputEmailChangeArray', inputEmailChangeArray)

    // ****************** CHANGE EMAIL ADD ITEMS LOGIC END ****************** //


    // DELETE ACCOUNT BUTTON

    const deleteAccountBtn = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log('DELETE account button')
    }


    return (
        <div className="settings_main_block">


            <div className="settings_mainBlock_top">


                <div className="settings_top_left_block">

                    <div className="settings_reports_block">


                        <div className="settings_reports_block_items_contsiner">
                            <div className="settings_reports_header">Reports</div>
                            <div className="settings_reports_text">Manage your reports settings from the section below.</div>
                            <div className="settings_reports_text">For Premium Users Only</div>
                        </div>




                        <div className="settings_reports_settings_block_container">

                            <div className="settings_reports_settings_block">
                                <div className="settings_reports_settings_block_text_items">
                                    <div className="settings_rep_set_header">Report violators' to their platform</div>
                                    <div className="settings_rep_set_text">For example, Shopify DMCA report.</div>
                                </div>

                                <div className="settings_custom_button">
                                    <button
                                        onClick={() => reportButtonStatus()}
                                        style={reportButton ? null : disabledButtonOn}
                                        className="settingsCustomButton"
                                    >
                                        <div
                                            style={reportButton ? null : stylesOn}
                                            className="customButtonON">
                                            <div className="customButtonONText">ON</div>
                                        </div>
                                        <div className="customButtonLine"/>
                                        <div
                                            style={reportButton ? null : stylesOff}
                                            className="customButtonOFF">OFF</div>
                                    </button>
                                </div>

                            </div>

                            <div className="settings_horizontalLine"/>

                            <div className="settings_reports_settings_block">

                                <div className="settings_reports_settings_block_text_items">
                                    <div className="settings_rep_set_header">Send warnings to plagiators by emails</div>
                                    <div className="settings_rep_set_text">Politely asking the plagiators to delete a stolen content.</div>
                                </div>

                                <div className="settings_custom_button">

                                    <button
                                        onClick={() => sendButtonStatus()}
                                        style={sendButton ? null : disabledButtonOn}
                                        className="settingsCustomButton"
                                    >
                                        <div
                                            style={sendButton ? null : stylesOn}
                                            className="customButtonON">
                                            <div className="customButtonONText">ON</div>
                                        </div>
                                        <div className="customButtonLine"/>
                                        <div
                                            style={sendButton ? null : stylesOff}
                                            className="customButtonOFF">OFF</div>
                                    </button>

                                </div>


                            </div>
                        </div>

                    </div>







                    <div className="settings_notifications_block">

                        <div className="settings_notify_header">Email Notifications</div>
                        {/* <div className="settings_notify_text">Match Report</div> */}
                        <div className="settings_notify_select">
                            <CustomSelect
                                placeholder="weekly"
                                label="Match Report"
                                // icon={}
                                textColor="black"
                                width="100%"
                                height="100%"
                                selectOnClick={(event: React.ChangeEvent<HTMLSelectElement>) => selectUserData(event)}
                                name="weekly"
                                selectedStandard="Weekly"
                                selectedOptions={option}
                                optionValue={range}
                                setOptionValue={setRange}
                            />
                        </div>

                    </div>






                </div>




                <div className="settings_top_right_block">
                    <div className="settings_top_right_header">Whitelist</div>
                    <div className="settings_top_right_whitelistBlock">



                        {
                            inpWhitelistArray.map( (item, id) => {
                                return (
                                    <div className="settings_top_right_whitelistContainer">
                                        {/*<div className="settings_t_r_whiteList_items">ipadinsight.com/apple-news</div>*/}
                                        <div
                                            data-name={item}
                                            className="settings_t_r_whiteList_items"
                                        >
                                            {item}
                                        </div>
                                        <div
                                            onClick={() => deleteWhitelistItem(id)}
                                            className="settings_top_right_whitelistIcon"
                                        >
                                            {deleteIcon}
                                        </div>
                                    </div>
                                )
                            })
                        }








                    </div>



                    <div className="settings_top_right_add_block">
                        <div className="settings_t_r_add_block_input">
                            <Input
                                className="CustomInput"
                                placeholder = "Domain or URL ..."
                                minWidth = "100%"
                                height = "100%"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => inpWhitelistFunc(value)}
                            />
                        </div>
                        <div className="settings_t_r_add_block_button">
                            <Button
                                mainButtonClicked={(event: React.MouseEvent<HTMLButtonElement>) => pushNewWhitelistItem(event)}
                                buttonType="reg"
                                width = "100%"
                                height = "100%"
                                value = "ADD"
                                className="green"
                            />
                        </div>
                    </div>
                    <div className="settings_top_right_description">
                        Domains and URLs in the whitelist will not be considered plagiates. <br/>
                        Tip: Add known/confirmed domains to the whitelist. <br/>
                        Example: domain.com
                    </div>



                </div>


            </div>





            <div className="settings_mainBlock_bottom">


                <div className="settings_left_bottom_block">




                    <div className="settings_change_pass_block">
                        <div className="settings_ch_pass_header">Change Password</div>
                        <div className="settings_ch_pass_input_items">
                            <Input
                                label = "Current Password"
                                width = "620px"
                                height = "70px"
                                backgroundColor = "#FAFCFD"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => changePassInput(value)}
                                name="current_password"
                            />
                        </div>
                        <div className="settings_ch_pass_input_items">
                            <Input
                                label = "New Password"
                                width = "620px"
                                height = "70px"
                                backgroundColor = "#FAFCFD"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => changePassInput(value)}
                                name="new_password"
                            />
                        </div>
                        <div className="settings_ch_pass_input_items">
                            <Input
                                label = "Confirm Password"
                                width = "620px"
                                height = "70px"
                                backgroundColor = "#FAFCFD"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => changePassInput(value)}
                                name="confirm_password"
                            />
                        </div>
                    </div>


                    <div className="settings_ch_pass_button">
                        <Button
                            buttonType="reg"
                            width = "180px"
                            height = "40px"
                            className="green"
                            value = "Change password"
                            mainButtonClicked={(event: React.MouseEvent<HTMLDivElement>) => clickChangePassword(event)}
                        />
                    </div>


                </div>

                <div className="settings_verticalLine"/>

                <div className="settings_right_bottom_block">
                    <div className="settings_change_email_block">
                        <div className="settings_ch_email_header">Change Email</div>
                        <div className="settings_ch_email_input_items">
                            <Input
                                label = "Current Email"
                                width = "620px"
                                height = "70px"
                                backgroundColor = "#FAFCFD"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => changeEmailInput(value)}
                                name="current_email"
                            />
                        </div>
                        <div className="settings_ch_email_input_items">
                            <Input
                                label = "Current Password"
                                width = "620px"
                                height = "70px"
                                backgroundColor = "#FAFCFD"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => changeEmailInput(value)}
                                name="current_password"
                            />
                        </div>
                        <div className="settings_ch_email_input_items">
                            <Input
                                label = "New Email"
                                width = "620px"
                                height = "70px"
                                backgroundColor = "#FAFCFD"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => changeEmailInput(value)}
                                name="new_email"
                            />
                        </div>
                    </div>
                    <div className="settings_ch_email_button">
                        <Button
                            buttonType="reg"
                            width = "180px"
                            height = "40px"
                            className="green"
                            value = "Change email"
                            mainButtonClicked={(event: React.MouseEvent<HTMLDivElement>) => clickChangeEmail(event)}
                        />
                    </div>
                </div>



            </div>
            <div className="settings_delete_account_button">
                <Button
                    mainButtonClicked={(event: React.MouseEvent<HTMLDivElement>) => deleteAccountBtn(event)}
                    buttonType="delete"
                    value = "Delete Account"
                    className="red"
                    width = "180px"
                    height = "40px"
                />
            </div>


        </div>
    );
};

export default Settings;
