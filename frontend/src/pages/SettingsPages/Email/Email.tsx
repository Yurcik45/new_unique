import React, {useState} from 'react';
import './Email.sass'
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import BlocksInput from "../../../components/UI/BlocksInput/BlocksInput";
import TinumceReact from '../../../components/TinumceReact/TinumceReact';


interface Block {
    name: string,
    value: string
}
const Email = () => {


    // ------------------- INPUT BLOCKS BCC ------------------- //
    const [inputBCCValue, inputBCCValueHandler] = useState<Block | object>();
    const [inputTCCValue, inputTCCValueHandler] = useState<Block | object>();
    const [inputCCValue, inputCCValueHandler] = useState<Block | object>();
    const [bccValuesArray] = useState<string[]>([]);
    const [tccValuesArray] = useState<string[]>([]);
    const [ccValuesArray] = useState<string[]>([]);

    //saveSettingsOptionButton
    const saveSettingsOptionButton = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log('save click')
    }

    // ****************** INPUT BLOCKS BCC  ****************** //


    const [SETTING_OPTIONS_ARRAY] = useState<string | any>([])


    const settingsOptionsInput = (value: React.ChangeEvent<HTMLInputElement>) => {
        SETTING_OPTIONS_ARRAY[value.target.name] = value.target.value
    }

    return (
        <div className="email_warning_main_block">


            <div className="email_warning_itemsTopContainer">

                <div className="email_warning_sendingBlock">
                    <div className="email_warning_sendingBlock_descriptionItemsContainer">
                        <div className="email_warning_send_desc_itemHeader">Settings options</div>
                        <div className="email_warning_send_desc_itemDescription">
                            Add additional email warnings CC's.
                        </div>
                        <div className="email_warning_send_desc_itemDescription">
                            Add additional email warnings BCC's, beside yourself.
                        </div>
                        <div className="email_warning_send_desc_itemDescription">
                            Also, you can change subjects.
                        </div>
                    </div>
                    <div className="email_warning_sendingBlock_itemsContainer">
                        <div className="email_warning_sendBlock_items">
                            <Input
                                width="100%"
                                label="FIRST WARNING EMAIL SUBJECT:"
                                backgroundColor="#FAFCFD"
                                placeholder="INFRINGEMENT OF COPYRIGHTED MATERIAL"
                                name="infringement_of_copyrighted_material"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => settingsOptionsInput(value)}
                            />
                        </div>
                        <div className="email_warning_sendBlock_items">
                            <Input
                                width="100%"
                                label="SECOND WARNING EMAIL SUBJECT:"
                                backgroundColor="#FAFCFD"
                                placeholder="Re: INFRINGEMENT OF COPYRIGHTED MATERIAL"
                                name="re_infringement_of_copyrighted_material"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => settingsOptionsInput(value)}
                            />
                        </div>
                    </div>
                </div>


                <div className="email_warning_sendingBlock">
                    <div className="email_warning_sendingBlock_itemsContainer">
                        <div className="email_warning_sendBlock_items">
                            <Input
                                width="100%"
                                label="TO"
                                backgroundColor="#FAFCFD"
                                placeholder="{{ PLAGIATOR_DOMAIN }}"
                                name="TO"
                                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => settingsOptionsInput(value)}
                            />
                        </div>
                        <div className="email_warning_sendBlock_items">
                            <BlocksInput
                                width="100%"
                                // height="40px"
                                label="BCC"
                                className="BlockInput"
                                name="BCC"
                                blockValues={inputBCCValue}
                                blockValuesHandler={inputBCCValueHandler}
                                blockValuesArray={bccValuesArray}
                            />
                        </div>
                        <div className="email_warning_sendBlock_items">
                            <BlocksInput
                                width="100%"
                                // height="40px"
                                label="TCC"
                                className="BlockInput"
                                name="TCC"
                                blockValues={inputTCCValue}
                                blockValuesHandler={inputTCCValueHandler}
                                blockValuesArray={tccValuesArray}
                            />
                        </div>
                        <div className="email_warning_sendBlock_items">
                            <BlocksInput
                                width="100%"
                                // height="40px"
                                label="BCC"
                                className="BlockInput"
                                name="CC"
                                blockValues={inputCCValue}
                                blockValuesHandler={inputCCValueHandler}
                                blockValuesArray={ccValuesArray}
                            />
                        </div>
                    </div>
                </div>

            </div>




            <div className="email_warning_itemsBottomContainer">



                    <div className="email_warnings_block">
                        <div className="email_warning_sendingBlock_descriptionItemsContainer">
                            <div className="email_warning_send_desc_itemHeader">First Warning Email Template</div>
                            <div className="email_warning_send_desc_itemDescription">
                                Add additional email warnings CC's.
                            </div>
                            <div className="email_warning_send_desc_itemDescription">
                                Add additional email warnings BCC's, beside yourself.
                            </div>
                            <div className="email_warning_send_desc_itemDescription">
                                Also, you can change subjects.
                            </div>
                        </div>
                        <div className="email_warn_userlyBlock">
                                <TinumceReact/>
                        </div>
                    </div>


                    <div className="email_warnings_block">
                        <div className="email_warning_sendingBlock_descriptionItemsContainer">
                            <div className="email_warning_send_desc_itemHeader">Second Warning Email Template</div>
                            <div className="email_warning_send_desc_itemDescription">
                                Add additional email warnings CC's.
                            </div>
                            <div className="email_warning_send_desc_itemDescription">
                                Add additional email warnings BCC's, beside yourself.
                            </div>
                            <div className="email_warning_send_desc_itemDescription">
                                Also, you can change subjects.
                            </div>
                        </div>
                        <div className="email_warn_userlyBlock">
                            <TinumceReact/>
                        </div>
                    </div>


            </div>






            <div className="email_warning_saveButton">
                <Button
                    width="160px"
                    height="40px"
                    value="Save"
                    className="green"
                    mainButtonClicked={(event: React.MouseEvent<HTMLDivElement>) => saveSettingsOptionButton(event)}
                />
            </div>


        </div>
    );
};

export default Email;
