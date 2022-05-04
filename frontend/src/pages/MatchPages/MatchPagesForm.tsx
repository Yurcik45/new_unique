import {useState} from 'react';
import './MatchPagesForm.sass'
import Button from "../../components/UI/Button/Button";
import Matches from "./Matches/Matches";
import mainImage from '../../assets/images/unseenPhotoExample.png'
import MatchesSearch from '../../components/MatchesSearch/MatchesSearch';

const DashboardPagesForm = ()  => {

    const[openModal, openModalHandler] = useState<boolean | any>(false);
    const[openNewModal, openNewModalHandler] = useState<boolean | any>(false);


    const[searchValue, setSearchValue] = useState<string | any>('');

    const closeModalIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path d="M10.6491 9.01558L17.6579 2.00652C18.1141 1.55061 18.1141 0.813468 17.6579 0.357558C17.202 -0.0983525 16.4649 -0.0983525 16.009 0.357558L8.99991 7.36661L1.99106 0.357558C1.53493 -0.0983525 0.798004 -0.0983525 0.342093 0.357558C-0.114031 0.813468 -0.114031 1.55061 0.342093 2.00652L7.35095 9.01558L0.342093 16.0246C-0.114031 16.4805 -0.114031 17.2177 0.342093 17.6736C0.569301 17.901 0.868045 18.0153 1.16658 18.0153C1.46511 18.0153 1.76364 17.901 1.99106 17.6736L8.99991 10.6645L16.009 17.6736C16.2364 17.901 16.5349 18.0153 16.8335 18.0153C17.132 18.0153 17.4305 17.901 17.6579 17.6736C18.1141 17.2177 18.1141 16.4805 17.6579 16.0246L10.6491 9.01558Z" fill="#48519D"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="18" height="18" fill="white"/>
            </clipPath>
        </defs>
    </svg>

    const closeModal = () => {openModalHandler(false)}
    const closeNewModal = () => {openNewModalHandler(false)}


    const onApproved = () => {closeModal()}
    const onIgnore = () => {closeModal()}
    const onConfirm = () => {closeNewModal()}
    const onPlagiator = () => {closeNewModal()}

    const tempImagesArr = [
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
        {img: mainImage},
    ]

    const [tempArr, setTempArr] = useState<any[]>([''])

    return (
        <div className="MatchesGeneralPageContainer">
                    <MatchesSearch
                        tempArr={tempArr}
                        searchValue={searchValue}
                        setSearchValue={(value: string) => setSearchValue(value)}
                    />
                    <Matches
                        tempArr={tempArr}
                        openModalHandler={openModalHandler}
                        openNewModalHandler={openNewModalHandler}
                        setTempArr={(value: any[]) => setTempArr(value)}
                        searchValue={searchValue}
                        setSearchValue={(value: string) => setSearchValue(value)}
                    />

            {
                openModal
                    ? <div className="matches_page_modal_container">
                        <div className="matches_page_modal">
                            <div className="matches_close_icon_container">
                                <div
                                    onClick={closeModal}
                                    className="matches_close_icon"
                                >
                                    {closeModalIcon}
                                </div>
                            </div>
                            <div className="matches_page_modal_header">
                                Ignore all matches on URL
                            </div>
                            <div className="matches_page_modal_description">
                                Таким образом постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия.
                            </div>
                            <div className="matches_page_modal_input">
                        <textarea name="" id="" cols={40} rows={10}>
                            Таким образом постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия.
                        </textarea>
                            </div>
                            <div className="matches_page_modal_buttons_container">
                                <div className="matches_page_modal_approved_button">
                                    <Button
                                        uppercase={true}
                                        value="APPROVED USAGE"
                                        className="green"
                                        width="260px"
                                        height="50px"
                                        mainButtonClicked={() => onApproved()}
                                    />
                                </div>
                                <div className="matches_page_modal_delete_button">
                                    <Button
                                        uppercase={true}
                                        value="IGNORE"
                                        className="red"
                                        width="260px"
                                        height="50px"
                                        mainButtonClicked={() => onIgnore()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
            {
                openNewModal
                    ? <div className="matches_page_new_modal_container">
                    <div className="matches_page_new_modal">


                        <div className="matches_new_close_icon_container">
                            <div
                                onClick={closeNewModal}
                                className="matches_new_close_icon"
                            >
                                {closeModalIcon}
                            </div>
                        </div>


                        <div className="matches_page_new_modal_header">
                            Ignore all matches on URL
                        </div>


                        <div className="matches_page_new_modal_description">
                            Таким образом постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия.
                        </div>

                        <div className="matches_page_new_modal_button_container">

                            <Button
                                uppercase={true}
                                value="Confirm"
                                className="green"
                                width="250px"
                                height="55px"
                                mainButtonClicked={() => onConfirm()}
                            />

                        </div>
                        <div className="matches_page_new_modal_button_container">


                            <Button
                                uppercase={true}
                                value="Plagiator"
                                className="green"
                                width="160px"
                                height="35px"
                                mainButtonClicked={() => onPlagiator()}
                            />
                        </div>
                        <div className="matches_page_new_modal_images_container">
                            {
                                tempImagesArr.map((i, id) => {
                                    return (
                                        <div key={id} className="modal_image_items">
                                            <img src={i.img} alt="modal item"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                    : null
            }

        </div>
    )
}

export default DashboardPagesForm;
