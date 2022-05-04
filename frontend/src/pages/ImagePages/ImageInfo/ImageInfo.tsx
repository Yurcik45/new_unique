import './ImageInfo.sass'
import Button from "../../../components/UI/Button/Button";
import arrow from "../../../assets/images/down-arrow 1.svg";
import {NavLink, useHistory} from "react-router-dom";
import { SelectImage } from '../ImagePagesForm'
import {useDispatch} from "react-redux";
import {deleteImage} from '../../../redux/actions/images'

const ImageInfo = (props: SelectImage) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const imagesIcon = <svg width="34" height="27" viewBox="0 0 34 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.7637 4.23535H1V25.808H29.7637V4.23535Z" stroke="#48519D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M27.0676 6.93213H3.69653V23.1126H27.0676V6.93213Z" stroke="#48519D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M27.068 23.1114L19.877 10.5273L14.9324 19.1789L10.888 14.1237L3.69653 23.1123L12.6864 23.1114L12.6855 23.1123L27.068 23.1114Z" stroke="#48519D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.87426 16.6411L10.8881 14.1238L12.3409 15.9392C13.1012 15.2809 13.5842 14.3094 13.5842 13.2239C13.5842 11.2391 11.9744 9.62842 9.98913 9.62842C8.00343 9.62842 6.39404 11.2387 6.39404 13.2239C6.39447 14.8205 7.43511 16.1705 8.87426 16.6411Z" stroke="#48519D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.23486 1V4.23541H29.7636V22.5718H32.9999V1H4.23486Z" stroke="#48519D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

    const whiteListIcon = <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.946 14.6958C20.8564 14.6958 20.7705 14.6602 20.7071 14.5969C20.6437 14.5335 20.6082 14.4476 20.6082 14.358V13.3681C20.6082 13.2785 20.6437 13.1926 20.7071 13.1292C20.7705 13.0659 20.8564 13.0303 20.946 13.0303C21.0356 13.0303 21.1215 13.0659 21.1849 13.1292C21.2482 13.1926 21.2838 13.2785 21.2838 13.3681V14.358C21.2838 14.4476 21.2482 14.5335 21.1849 14.5969C21.1215 14.6602 21.0356 14.6958 20.946 14.6958Z" fill="white"/>
        <path d="M15.8783 0.475293H15.8784C16.021 0.475323 16.1578 0.532001 16.2586 0.632858L15.8783 0.475293ZM15.8783 0.475293H4.05402C3.91138 0.475293 3.77458 0.531958 3.67372 0.632822C3.57285 0.733686 3.51619 0.870487 3.51619 1.01313V23.9861C3.51619 24.1287 3.57285 24.2655 3.67371 24.3664C3.77458 24.4673 3.91138 24.5239 4.05402 24.5239H20.9459C21.0886 24.5239 21.2254 24.4673 21.3262 24.3664C21.4271 24.2655 21.4838 24.1287 21.4838 23.9861V20.0807C21.4838 19.9381 21.4271 19.8013 21.3262 19.7004C21.2254 19.5995 21.0886 19.5429 20.9459 19.5429C20.8033 19.5429 20.6665 19.5995 20.5656 19.7004C20.4647 19.8013 20.4081 19.9381 20.4081 20.0807V23.4483H4.59186V1.55097H15.6556L20.4081 6.30341V10.9996C20.4081 11.1423 20.4647 11.2791 20.5656 11.3799C20.6665 11.4808 20.8033 11.5375 20.9459 11.5375C21.0886 11.5375 21.2254 11.4808 21.3262 11.3799C21.4271 11.2791 21.4838 11.1423 21.4838 10.9996V6.0807V6.08066C21.4837 5.93804 21.427 5.80127 21.3262 5.70043C21.3262 5.70042 21.3262 5.70041 21.3262 5.7004L16.2586 0.632878L15.8783 0.475293Z" fill="white" stroke="white" strokeWidth="0.4"/>
        <path d="M20.946 18.0542C20.8564 18.0542 20.7705 18.0186 20.7071 17.9552C20.6437 17.8919 20.6082 17.8059 20.6082 17.7163V16.7231C20.6082 16.6335 20.6437 16.5476 20.7071 16.4842C20.7705 16.4208 20.8564 16.3853 20.946 16.3853C21.0356 16.3853 21.1215 16.4208 21.1849 16.4842C21.2482 16.5476 21.2838 16.6335 21.2838 16.7231V17.7163C21.2838 17.8059 21.2482 17.8919 21.1849 17.9552C21.1215 18.0186 21.0356 18.0542 20.946 18.0542Z" fill="white"/>
        <path d="M20.9458 6.41854H15.8782C15.7886 6.41854 15.7027 6.38294 15.6394 6.31959C15.576 6.25623 15.5404 6.1703 15.5404 6.0807V1.01313C15.5404 0.923531 15.576 0.8376 15.6394 0.774243C15.7027 0.710886 15.7886 0.675293 15.8782 0.675293C15.9678 0.675293 16.0538 0.710886 16.1171 0.774243C16.1805 0.8376 16.2161 0.923531 16.2161 1.01313V5.74286H20.9458C21.0354 5.74286 21.1213 5.77845 21.1847 5.84181C21.248 5.90517 21.2836 5.9911 21.2836 6.0807C21.2836 6.1703 21.248 6.25623 21.1847 6.31959C21.1213 6.38294 21.0354 6.41854 20.9458 6.41854Z" fill="white"/>
        <path d="M9.34084 11.057H6.51618C6.42658 11.057 6.34065 11.0214 6.27729 10.958C6.21394 10.8947 6.17834 10.8087 6.17834 10.7191V7.89448C6.17834 7.80488 6.21394 7.71895 6.27729 7.65559C6.34065 7.59223 6.42658 7.55664 6.51618 7.55664H9.34084C9.43044 7.55664 9.51637 7.59223 9.57973 7.65559C9.64309 7.71895 9.67868 7.80488 9.67868 7.89448V10.7191C9.67868 10.8087 9.64309 10.8947 9.57973 10.958C9.51637 11.0214 9.43044 11.057 9.34084 11.057ZM6.85402 10.3813H9.00301V8.23232H6.85402V10.3813Z" fill="white"/>
        <path d="M9.34084 16.235H6.51618C6.42658 16.235 6.34065 16.1995 6.27729 16.1361C6.21394 16.0727 6.17834 15.9868 6.17834 15.8972V13.0722C6.17834 12.9826 6.21394 12.8967 6.27729 12.8333C6.34065 12.77 6.42658 12.7344 6.51618 12.7344H9.34084C9.43044 12.7344 9.51637 12.77 9.57973 12.8333C9.64309 12.8967 9.67868 12.9826 9.67868 13.0722V15.8972C9.67868 15.9868 9.64309 16.0727 9.57973 16.1361C9.51637 16.1995 9.43044 16.235 9.34084 16.235ZM6.85402 15.5594H9.00301V13.41H6.85402V15.5594Z" fill="white"/>
        <path d="M9.34084 21.4124H6.51618C6.42658 21.4124 6.34065 21.3769 6.27729 21.3135C6.21394 21.2501 6.17834 21.1642 6.17834 21.0746V18.2499C6.17834 18.1603 6.21394 18.0744 6.27729 18.0111C6.34065 17.9477 6.42658 17.9121 6.51618 17.9121H9.34084C9.43044 17.9121 9.51637 17.9477 9.57973 18.0111C9.64309 18.0744 9.67868 18.1603 9.67868 18.2499V21.0746C9.67868 21.1642 9.64309 21.2501 9.57973 21.3135C9.51637 21.3769 9.43044 21.4124 9.34084 21.4124ZM6.85402 20.7368H9.00301V18.5878H6.85402V20.7368Z" fill="white"/>
        <path d="M18.4838 9.6454H11.5129C11.4233 9.6454 11.3374 9.60981 11.274 9.54645C11.2106 9.48309 11.175 9.39716 11.175 9.30756C11.175 9.21796 11.2106 9.13203 11.274 9.06868C11.3374 9.00532 11.4233 8.96973 11.5129 8.96973H18.4838C18.5734 8.96973 18.6594 9.00532 18.7227 9.06868C18.7861 9.13203 18.8217 9.21796 18.8217 9.30756C18.8217 9.39716 18.7861 9.48309 18.7227 9.54645C18.6594 9.60981 18.5734 9.6454 18.4838 9.6454Z" fill="white"/>
        <path d="M18.4838 14.8227H11.5129C11.4233 14.8227 11.3374 14.7871 11.274 14.7237C11.2106 14.6603 11.175 14.5744 11.175 14.4848C11.175 14.3952 11.2106 14.3093 11.274 14.2459C11.3374 14.1826 11.4233 14.147 11.5129 14.147H18.4838C18.5734 14.147 18.6594 14.1826 18.7227 14.2459C18.7861 14.3093 18.8217 14.3952 18.8217 14.4848C18.8217 14.5744 18.7861 14.6603 18.7227 14.7237C18.6594 14.7871 18.5734 14.8227 18.4838 14.8227Z" fill="white"/>
        <path d="M18.4838 19.9999H11.5129C11.4233 19.9999 11.3374 19.9643 11.274 19.9009C11.2106 19.8376 11.175 19.7517 11.175 19.6621C11.175 19.5725 11.2106 19.4865 11.274 19.4232C11.3374 19.3598 11.4233 19.3242 11.5129 19.3242H18.4838C18.5734 19.3242 18.6594 19.3598 18.7227 19.4232C18.7861 19.4865 18.8217 19.5725 18.8217 19.6621C18.8217 19.7517 18.7861 19.8376 18.7227 19.9009C18.6594 19.9643 18.5734 19.9999 18.4838 19.9999Z" fill="white"/>
    </svg>

    const cancelIcon = <svg width="35" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.8801 15.0051L13.8801 15.0051L11.0146 17.8707L10.9439 17.9414L11.0146 18.0121L13.8801 20.8777L13.8801 20.8777C14.1462 21.1437 14.1462 21.575 13.8801 21.841L13.8801 21.8411C13.7472 21.9741 13.5729 22.0406 13.3984 22.0406C13.224 22.0406 13.0497 21.9741 12.9168 21.8411L12.9168 21.841L10.0512 18.9756L9.98047 18.9049L9.90976 18.9756L7.04416 21.841L7.04412 21.8411C6.91121 21.9741 6.73696 22.0406 6.5625 22.0406C6.38804 22.0406 6.21379 21.9741 6.08088 21.8411L6.08082 21.841C5.81472 21.575 5.81472 21.1437 6.08082 20.8777L6.08084 20.8777L8.94629 18.0121L9.017 17.9414L8.94629 17.8707L6.08084 15.0051L6.08082 15.0051C5.81472 14.7391 5.81472 14.3078 6.08082 14.0418L6.08086 14.0418C6.34683 13.7757 6.77817 13.7757 7.04414 14.0418L7.04416 14.0418L9.90976 16.9072L9.98047 16.9779L10.0512 16.9072L12.9168 14.0418L12.9168 14.0418C13.1828 13.7757 13.6141 13.7757 13.8801 14.0418L13.8801 14.0418C14.1462 14.3078 14.1462 14.7391 13.8801 15.0051ZM15.3522 25.5378L15.3522 25.5378C15.5472 25.8595 15.4443 26.2783 15.1225 26.4733L15.1743 26.5588L15.1224 26.4733C13.5818 27.4066 11.8104 27.9 10 27.9C7.35547 27.9 4.86961 26.8703 2.99964 25.0004C1.12966 23.1304 0.1 20.6445 0.1 18C0.1 15.3555 1.12966 12.8696 2.99964 10.9996C4.86961 9.12966 7.35547 8.1 10 8.1C12.6445 8.1 15.1304 9.12966 17.0004 10.9996C18.8703 12.8696 19.9 15.3555 19.9 18C19.9 19.9539 19.3201 21.8543 18.2227 23.4959C18.0135 23.8087 17.5904 23.8926 17.2777 23.6836C16.9649 23.4744 16.8808 23.0513 17.09 22.7387L17.09 22.7386C18.0368 21.3223 18.5375 19.6837 18.5375 18C18.5375 13.2924 14.7076 9.4625 10 9.4625C5.29237 9.4625 1.4625 13.2924 1.4625 18C1.4625 22.7076 5.29237 26.5375 10 26.5375C11.5613 26.5375 13.0886 26.1123 14.4166 25.308L14.3648 25.2224L14.4166 25.308C14.7383 25.1131 15.1573 25.2159 15.3522 25.5378Z" fill="white" stroke="#48519D" strokeWidth="0.2"/>
        <ellipse cx="9.5" cy="18" rx="6.5" ry="6" fill="#900000"/>
        <path d="M7.81775 23.05H7.81766C7.49171 23.0494 7.18044 22.9127 6.9569 22.6722C6.73253 22.4325 6.60516 22.0999 6.60516 21.7471V16.0146C6.17393 15.879 5.8992 15.4473 5.95787 14.9903L5.95787 14.9903C6.01831 14.5204 6.4129 14.1679 6.88124 14.1678H6.88125H8.0123V13.9252V13.9251H8.0623C8.06095 13.6789 8.15683 13.4425 8.32848 13.2686L7.81775 23.05ZM7.81775 23.05H12.1823H12.1823M7.81775 23.05H12.1823M12.1823 23.05C12.5083 23.0494 12.8195 22.9128 13.043 22.6724L12.1823 23.05ZM8.97582 12.95V13L11.6715 13.2686C11.4999 13.0948 11.2667 12.998 11.0242 13V12.95H11.024H8.97603H8.97582ZM11.9877 13.9251H11.9377L13.0431 22.6722C13.2675 22.4325 13.3948 22.0998 13.3948 21.7471V16.0146C13.8261 15.879 14.1008 15.4473 14.0421 14.9903L14.0421 14.9903C13.9817 14.5204 13.5871 14.1679 13.1188 14.1678H13.1188H11.9877V13.9252V13.9251ZM8.57366 13.9251H8.57366L8.57365 13.9245C8.57229 13.8158 8.61437 13.7114 8.69012 13.6349L8.69013 13.6349C8.76574 13.5584 8.86848 13.5165 8.97495 13.5184L8.97495 13.5184H8.97582H11.0242V13.5184L11.0251 13.5184C11.1315 13.5165 11.2343 13.5584 11.3099 13.6349L11.3099 13.6349C11.3856 13.7113 11.4277 13.8158 11.4263 13.9245L11.4263 13.9245V13.9251V14.1678H8.57366V13.9251ZM8.65459 13.5997C8.73974 13.5136 8.85562 13.4663 8.97582 13.4684L8.65459 13.5997ZM12.1823 22.4816H7.81775C7.45611 22.4816 7.16652 22.1655 7.16652 21.7471V16.0477H12.8335V21.7471C12.8335 22.1655 12.5439 22.4816 12.1823 22.4816ZM6.88125 14.7362H13.1188C13.3198 14.7362 13.484 14.9018 13.484 15.1078C13.484 15.3137 13.3198 15.4793 13.1188 15.4793H6.88125C6.68024 15.4793 6.51603 15.3137 6.51603 15.1078C6.51603 14.9018 6.68024 14.7362 6.88125 14.7362Z" fill="white" stroke="white" strokeWidth="0.1"/>
    </svg>

    const imagesDomainArr = [
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
        {domain: "pinterest.it"},
    ]

    const deleteImageClick = () => {
        //@ts-ignore
        dispatch(deleteImage(props.selectImage.id))
        history.push('/images/all')
    }

    return (
        <div className="ImageInfoPage">

            <div className="unseen_back_button_block">
                <NavLink to="/images/all">
                    <div className="unseen_back_arrow">
                        <img src={arrow} alt="arrow"/>
                    </div>
                    <div className="unseen_back_text">
                        back
                    </div>
                </NavLink>
            </div>

            <div className="image_info_left_container">




                <div className="image_info_left_block">


                    <div className="left_block_top">



                        <div className="block_top_arrow_and_name">
                            <div className="block_top_arrow">
                                <img src={arrow} alt="arrow"/>
                                <div className="top_arrow_text">image</div>
                            </div>
                            <div className="block_top_name">478345858.jpg</div>
                        </div>



                        <div className="block_top_image_and_info">
                            <div className="block_top_image">
                                {/*@ts-ignore*/}
                                {/* <img src={props.selectImage.url} alt="select"/> */}
                                <img src="https://d8pb1shnzcrzd.cloudfront.net/33f94156-b61b-48ac-96a0-f7eebf858b4f.jpeg" alt="select"/>
                            </div>

                            <div className="block_top_info_container">
                                <div className="block_top_info">
                                    <div className="info_matches">11 matches</div>
                                </div>


                                <div className="block_top_item_container">
                                    <div className="block_top_item_name">LAST SCAN</div>
                                    <div className="block_top_item_text">January 11, 2021</div>
                                </div>

                                <div className="block_top_item_container">
                                    <div className="block_top_item_name">IMPORTED</div>
                                    <div className="block_top_item_text">January 11, 2021</div>
                                </div>

                                <div className="block_top_item_container">
                                    <div className="block_top_item_name">SOURCE</div>
                                    <div className="block_top_item_text">iPhone</div>
                                </div>
                            </div>
                        </div>



                        <div className="block_top_buttons">
                            <Button
                                uppercase={true}
                                value="whitelist"
                                className="green"
                                width="40%"
                                height="100%"
                                fontSize="12px"
                                buttonIcon={whiteListIcon}
                            />
                            <Button
                                uppercase={true}
                                value="delete"
                                className="red"
                                width="40%"
                                height="100%"
                                fontSize="12px"
                                mainButtonClicked={() => deleteImageClick()}
                                buttonIcon={cancelIcon}
                            />
                        </div>
                    </div>
                    <div className="left_block_bottom">
                        <div className="bottom_header">Image Information</div>
                        <div className="bottom_items_container">
                            <div className="bottom_item">
                                <div className="bottom_item_header">TITLE</div>
                                <div className="bottom_item_description">478345858.jpg</div>
                            </div>
                            <div className="bottom_item">
                                <div className="bottom_item_header">DATE CREATED</div>
                                <div className="bottom_item_description">January 11, 2021</div>
                            </div>
                            <div className="bottom_item">
                                <div className="bottom_item_header">DATE PUBLISHED</div>
                                <div className="bottom_item_description">January 11, 2021</div>
                            </div>
                            <div className="bottom_item">
                                <div className="bottom_item_header">RIGHTS OWNER</div>
                                <div className="bottom_item_description">Ricardo Orii</div>
                            </div>
                            <div className="bottom_item">
                                <div className="bottom_item_header">PLACE CREATED</div>
                                <div className="bottom_item_description">-</div>
                            </div>
                            <div className="bottom_item">
                                <div className="bottom_item_header">PUBLISHED LOCATION</div>
                                <div className="bottom_item_description">-</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image_info_right_block">


                    <div className="info_right_block_matches_container">
                        <div className="matches_icon">{imagesIcon}</div>
                        <div className="matches_text">11 Matches</div>
                    </div>



                    <div className="info_right_block_images_container">

                        {
                            imagesDomainArr.map((dom, id) => {
                                return (
                                    <div key={id} className="images_container">
                                        <div className="images_item"/>
                                        <div className="images_text">{dom.domain}</div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="right_block_button">
                        <Button
                            uppercase={false}
                            value="Show all matches"
                            className="green"
                            width="180px"
                            height="40px"
                            fontSize="12px"
                        />
                    </div>


                </div>
            </div>

        </div>
    );
};

export default ImageInfo;