import {useEffect} from 'react';
import './MatchesSearch.sass'
import noColorLogo from "../../../../assets/images/matches/noColorLogo.svg";

const MatchesSearch = () => {


    const imageItem = <svg width="51" height="40" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.8638 1.49609H1V38.1438H49.8638V1.49609Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M45.2839 6.07715H5.58105V33.5645H45.2839V6.07715Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M45.2846 33.5629L33.0684 12.1851L24.6685 26.8823L17.7979 18.2946L5.58105 33.5644L20.853 33.5629L20.8516 33.5644L45.2846 33.5629Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.3765 22.5709L17.7976 18.2944L20.2656 21.3785C21.5573 20.2601 22.3778 18.6097 22.3778 16.7658C22.3778 13.3939 19.643 10.6577 16.2704 10.6577C12.8971 10.6577 10.1631 13.3932 10.1631 16.7658C10.1638 19.4781 11.9316 21.7714 14.3765 22.5709Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    const middleTransparrentItem = <svg width="52" height="39" viewBox="0 0 52 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5">
    <path d="M50.7281 1H1.86426V37.6477H50.7281V1Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M46.1481 5.58105H6.44531V33.0684H46.1481V5.58105Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M46.1488 33.0668L33.9327 11.689L25.5328 26.3862L18.6622 17.7985L6.44531 33.0683L21.7173 33.0668L21.7158 33.0683L46.1488 33.0668Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.2407 22.0748L18.6619 17.7983L21.1299 20.8825C22.4215 19.7641 23.242 18.1136 23.242 16.2697C23.242 12.8978 20.5073 10.1616 17.1347 10.1616C13.7614 10.1616 11.0273 12.8971 11.0273 16.2697C11.0281 18.982 12.7959 21.2753 15.2407 22.0748Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    </svg>
    const transparrentItem = <svg width="52" height="39" viewBox="0 0 52 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.2">
    <path d="M50.5914 1H1.72754V37.6477H50.5914V1Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M46.0114 5.58105H6.30859V33.0684H46.0114V5.58105Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M46.0121 33.0668L33.796 11.689L25.396 26.3862L18.5255 17.7985L6.30859 33.0683L21.5806 33.0668L21.5791 33.0683L46.0121 33.0668Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.104 22.0748L18.5252 17.7983L20.9932 20.8825C22.2848 19.7641 23.1053 18.1136 23.1053 16.2697C23.1053 12.8978 20.3706 10.1616 16.998 10.1616C13.6247 10.1616 10.8906 12.8971 10.8906 16.2697C10.8913 18.982 12.6592 21.2753 15.104 22.0748Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    </svg>
    const groupItems = <svg width="63" height="50" viewBox="0 0 63 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" d="M12 1V6.54938H56.3746V38H62V1H12Z" stroke="#E9ECF1" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path opacity="0.5" d="M6 6V11.5494H50.3746V43H56V6H6Z" stroke="#C8CFDB" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M49.8638 12H1V48.6477H49.8638V12Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M45.2839 16.5811H5.58105V44.0684H45.2839V16.5811Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M45.2846 44.0668L33.0684 22.689L24.6685 37.3862L17.7979 28.7985L5.58105 44.0683L20.853 44.0668L20.8516 44.0683L45.2846 44.0668Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.3765 33.0748L17.7976 28.7983L20.2656 31.8825C21.5573 30.7641 22.3778 29.1136 22.3778 27.2697C22.3778 23.8978 19.643 21.1616 16.2704 21.1616C12.8971 21.1616 10.1631 23.8971 10.1631 27.2697C10.1638 29.982 11.9316 32.2753 14.3765 33.0748Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
            
    const dollarIcon = <svg width="51" height="39" viewBox="0 0 51 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.8638 1H1V37.6477H49.8638V1Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M45.7028 5.58105H6V33.0684H45.7028V5.58105Z" stroke="#92A0B8" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42.9955 28.3581C42.946 27.7912 42.4595 27.3665 41.8803 27.4201C39.8827 27.5912 37.8419 27.6654 35.8257 27.6304C35.8195 27.6304 35.8134 27.6304 35.8092 27.6304C35.2484 27.6304 34.7867 28.0818 34.7784 28.6446C34.7702 29.2136 35.2237 29.6836 35.7927 29.6918C36.1246 29.698 36.4544 29.7 36.7863 29.7C38.5489 29.7 40.3177 29.6238 42.0575 29.4732C42.6245 29.426 43.045 28.925 42.9955 28.3581Z" fill="#92A0B8"/>
        <path d="M15.2112 9.08551C13.1126 9.05662 10.9975 9.12465 8.91951 9.304C8.35256 9.35145 7.93202 9.85239 7.98149 10.4192C8.02894 10.9553 8.47828 11.3613 9.00812 11.3613C9.03701 11.3613 9.06581 11.3593 9.09673 11.3572C11.1047 11.184 13.1496 11.1078 15.1781 11.1469C15.1843 11.1469 15.1905 11.1469 15.1946 11.1469C15.7554 11.1469 16.2171 10.6974 16.2254 10.1326C16.2337 9.56375 15.7801 9.09585 15.2112 9.08551Z" fill="#92A0B8"/>
        <path d="M25.7717 18.1329L25.4859 18.0783C22.841 17.5898 21.6067 16.774 21.6067 15.5061C21.6067 14.0978 23.3917 12.9079 25.5066 12.9079C27.541 12.9079 29.2896 14.0122 29.4039 15.3658C29.4637 16.0803 30.108 16.6389 30.807 16.5506C31.5215 16.4908 32.0516 15.8621 31.9918 15.1475C31.7579 12.3882 28.97 10.3096 25.504 10.3096C21.9211 10.3096 19.0059 12.6402 19.0059 15.5061C19.0059 18.1744 21.0272 19.8997 25.2416 20.6765L25.5222 20.7285C28.1646 21.217 29.3961 22.0328 29.3961 23.3007C29.3961 24.709 27.6112 25.8989 25.4963 25.8989C23.4618 25.8989 21.7133 24.7973 21.5989 23.4411C21.5391 22.7265 20.913 22.1861 20.1959 22.2563C19.4813 22.3161 18.9513 22.9447 19.0111 23.6593C19.2424 26.4161 22.0329 28.4972 25.4988 28.4972C29.0818 28.4972 31.997 26.1666 31.9996 23.3034C31.9997 20.6323 29.9809 18.9097 25.7717 18.1329Z" fill="#92A0B8"/>
        <path d="M25.5023 9C24.7852 9 24.2031 9.58204 24.2031 10.2992V28.4866C24.2031 29.2038 24.7852 29.7858 25.5023 29.7858C26.2194 29.7858 26.8014 29.2038 26.8014 28.4866V10.2992C26.8014 9.58204 26.2194 9 25.5023 9Z" fill="#92A0B8"/>
    </svg>

    return (
            <div style={{opacity: 0.3}} className='matches_search_version_page'>
            {/* <div className='matches_search_version_page'> */}


                <div className="search_version_filters_and_main_block">
                    <div className="filters_and_main_block_mainLogo">
                        <div className="main_block_mainLogo"><img src={noColorLogo} alt="LOGO"/></div>
                        <div className="main_block_matches">60 matches</div>
                    </div>
                </div>


                <div className="search_version_preview">
                    <div className="preview_line"/>
                    <div className="preview_name">actions</div>
                    <div className="preview_line"/>
                </div>


                <div className="search_version_actions_block">
                    <div className="actions_block_item_container">
                        <div className="actions_block_item_top">60</div>
                        <div className="actions_block_item_bottom">UNSEEN MATCHES</div>
                    </div>
                    <div className="actions_block_item_container">
                        <div className="actions_block_item_top">60</div>
                        <div className="actions_block_item_bottom">NEW SINCE JANUARY 5TH</div>
                    </div>
                    <div className="actions_block_item_container">
                        <div className="actions_block_item_top">1 day</div>
                        <div className="actions_block_item_bottom">LAST MATCH</div>
                    </div>
                </div>


                <div className="search_version_preview">
                    <div className="preview_line"/>
                    <div className="preview_name">relevant</div>
                    <div className="preview_line"/>
                </div>


                <div className="search_version_relevant_block">

                    <div className="relevant_block">
                        <div className="relevant_block_images_v1">
                            <div className="relevant_block_image">{imageItem}</div>
                            <div className="relevant_block_image">{middleTransparrentItem}</div>
                            <div className="relevant_block_image">{transparrentItem}</div>
                        </div>
                        <div className="relevant_block_number">60</div>
                        <div className="relevant_block_description">UNSEEN MATCHES</div>
                    </div>


                    <div className="relevant_block">
                        <div className="relevant_block_images_v1">
                            <div className="relevant_block_image">{groupItems}</div>
                            <div className="relevant_block_image">{groupItems}</div>
                        </div>
                        <div className="relevant_block_number">4</div>
                        <div className="relevant_block_description">MULTIPLE USES</div>
                    </div>

                    <div className="relevant_block">
                        <div className="relevant_block_images_v1">
                            <div className="relevant_block_image">{middleTransparrentItem}</div>
                            <div className="relevant_block_image">{imageItem}</div>
                            <div className="relevant_block_image">{middleTransparrentItem}</div>
                        </div>
                        <div className="relevant_block_number">9</div>
                        <div className="relevant_block_description">HIGH ACCURACY</div>
                    </div>


                    <div className="relevant_block">
                        <div className="relevant_block_images_v1">
                            <div className="relevant_block_image">{dollarIcon}</div>
                            </div>
                        <div className="relevant_block_number">10</div>
                        <div className="relevant_block_description">E-commerce matches</div>
                    </div>


                    <div className="relevant_block">
                        <div className="relevant_block_images_v2">
                            <div className="relevant_block_image left">{middleTransparrentItem}</div>
                            <div className="relevant_block_image">{imageItem}</div>
                            <div className="relevant_block_image right">{middleTransparrentItem}</div>
                        </div>
                        <div className="relevant_block_number">10</div>
                        <div className="relevant_block_description">NEWS & MEDIA matches</div>
                    </div>


                </div>


                <div className="search_version_preview">
                    <div className="preview_line"/>
                    <div className="preview_name">common</div>
                    <div className="preview_line"/>
                </div>


                <div className="search_version_common_block">
                    <div className="common_block_container">
                        <div className="common_block_number">5</div>
                        <div className="common_block_description">ONLINE</div>
                    </div>
                    <div className="common_block_container">
                        <div className="common_block_number">60</div>
                        <div className="common_block_description">MULTIPLE IMAGES</div>
                    </div>
                    <div className="common_block_container">
                        <div className="common_block_number">35</div>
                        <div className="common_block_description">FLAGGED</div>
                    </div>
                    <div className="common_block_container">
                        <div className="common_block_number">12</div>
                        <div className="common_block_description">MULTIPLE USES</div>
                    </div>
                    <div className="common_block_container">
                        <div className="common_block_number">9</div>
                        <div className="common_block_description">NOT ONLINE</div>
                    </div>
                </div>

                
            </div>
    );
};

export default MatchesSearch;