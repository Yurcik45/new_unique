import './ImagesMatch.sass';
import leftArrow from '../../../assets/images/imagesMatchLeftArrov.png';
import rightArrow from '../../../assets/images/imagesMatchRightArrow.png';
import goToImage from '../../../assets/images/goToimageIcon.png';
import checkImage from '../../../assets/images/checkImageIcon.png';
import arrow from '../../../assets/images/down-arrow 1.svg'
import Button from "../../../components/UI/Button/Button";

const ImagesMatch = () => {

    const acceptIcon = <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.1 10.5C0.1 4.75188 4.7514 0.1 10.5 0.1C16.2481 0.1 20.9 4.7514 20.9 10.5C20.9 16.2481 16.2486 20.9 10.5 20.9C4.75188 20.9 0.1 16.2486 0.1 10.5ZM1.29999 10.5C1.29999 15.573 5.42704 19.7 10.5 19.7C15.573 19.7 19.7 15.573 19.7 10.5C19.7 5.42704 15.573 1.29999 10.5 1.29999C5.42704 1.29999 1.29999 5.427 1.29999 10.5Z" fill="white" stroke="white" strokeWidth="0.2"/>
        <path d="M15.139 6.71226L15.0683 6.64155L15.139 6.71226C15.3733 6.47795 15.7532 6.47794 15.9876 6.71226C16.2219 6.94658 16.2219 7.32643 15.9876 7.56075L9.26075 14.2876C9.02655 14.5218 8.64648 14.5218 8.41222 14.2876L5.01255 10.8879C4.77824 10.6536 4.77824 10.2737 5.01255 10.0394L5.01256 10.0394C5.24683 9.80505 5.62677 9.80505 5.86109 10.0394L5.9318 9.96865L5.86109 10.0394L8.76581 12.9441L8.83652 13.0148L8.90723 12.9441L15.139 6.71226Z" fill="white" stroke="white" strokeWidth="0.2"/>
    </svg>

    const ignoreIcon = <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.1 10C0.1 4.52823 4.52777 0.1 10 0.1C15.4718 0.1 19.9 4.52777 19.9 10C19.9 15.4718 15.4722 19.9 10 19.9C4.52823 19.9 0.1 15.4722 0.1 10ZM1.23332 10C1.23332 14.8341 5.16598 18.7667 10 18.7667C14.834 18.7667 18.7667 14.834 18.7667 10C18.7667 5.16598 14.834 1.23332 10 1.23332C5.16598 1.23332 1.23332 5.16594 1.23332 10Z" fill="white" stroke="white" strokeWidth="0.2"/>
        <path d="M10.6106 9.99989L13.2065 7.40389C13.3754 7.23503 13.3754 6.96201 13.2065 6.79315C13.0376 6.62429 12.7646 6.62429 12.5957 6.79315L9.9998 9.38915L7.40393 6.79315C7.235 6.62429 6.96206 6.62429 6.7932 6.79315C6.62427 6.96201 6.62427 7.23503 6.7932 7.40389L9.38907 9.99989L6.7932 12.5959C6.62427 12.7647 6.62427 13.0378 6.7932 13.2066C6.87736 13.2909 6.988 13.3332 7.09857 13.3332C7.20913 13.3332 7.3197 13.2909 7.40393 13.2066L9.9998 10.6106L12.5957 13.2066C12.68 13.2909 12.7905 13.3332 12.9011 13.3332C13.0117 13.3332 13.1222 13.2909 13.2065 13.2066C13.3754 13.0378 13.3754 12.7647 13.2065 12.5959L10.6106 9.99989Z" fill="white"/>
    </svg>


    return (
        <div className="ImagesMatchPage" >
                {/* <TopMenu/> */}
            <div className="ImagesMatchMainContainer">
                <div className="images_match_container">


                    <div className="images_match_arrow_block">
                        <div>
                            <img src={leftArrow} alt="leftArrow"/>
                        </div>
                        <div className="match_arrow_text">prev</div>
                    </div>


                    <div className="images_match_main_block">


















                        <div className="images_menu_bar_container">


                            <div className="menu_bar_left_container">

                                <div className="menu_arrow">
                                    <img src={arrow} alt="arrow"/>
                                </div>


                                <div className="menu_matches_name_container">

                                    <div className="menu_count_matches">1 MATCH ON</div>


                                    <div className="menu_image_name">photowall.se</div>

                                </div>

                            </div>



                            <div className="menu_bar_right_container">

                                <div className="menu_action">
                                    <div>
                                        <img src={goToImage} alt="go to"/>
                                    </div>
                                    <div className="action_text">GO TO IMAGE</div>
                                </div>


                                <div className="menu_action">
                                    <div>
                                        <img src={checkImage} alt="check"/>
                                    </div>
                                    <div className="action_text">Mark</div>
                                </div>


                                <div className="menu_buttons">
                                    <Button
                                        uppercase={true}
                                        value="IGNORE"
                                        className="white"
                                        width="45%"
                                        height="100%"
                                        fontSize="10px"
                                        border="1px solid #48519D"
                                    />
                                    <Button
                                        uppercase={true}
                                        value="SEND Takedown"
                                        className="white"
                                        width="45%"
                                        height="100%"
                                        fontSize="10px"
                                        border="1px solid #48519D"
                                    />
                                </div>

                            </div>


                        </div>















                        <div className="images_match_bottom_block">
                            <div className="match_bottom_block_image"/>







                            <div className="match_bottom_block_descriptions_container">

                                <div className="match_bottom_block_information_container">
                                    <div className="information_container_first_seen">
                                        <div className="information_container_header">FIRST SEEN</div>
                                        <div className="information_container_text">January 11, 2021</div>
                                    </div>
                                    <div className="information_container_other_description">


                                        <div className="information_other_item">
                                            <div className="information_container_header">PAGE TITLE</div>
                                            <div className="information_container_text">Jonna Jinton aktuell med en ny tapetkollektion - Photowall</div>
                                        </div>

                                        <div className="information_other_item">
                                            <div className="information_container_header">PAGE URL</div>
                                            <div className="information_container_text">https://www.photowall.se/fototapet/intervju-med-jonna-jinton-alla-bilder-betyder-valdigt-mycket-for ...</div>
                                        </div>

                                        <div className="information_other_item">
                                            <div className="information_container_header">IMAGE URLeader</div>
                                            <div className="information_container_text">https://images.photowall.com/articles/42a47dd624d6e7dd22ab959f65eeac82.jpg?w=720&q=80</div>
                                        </div>


                                    </div>

                                </div>




                                <div className="match_bottom_block_button_container">
                                    <div className="button_container_single_match">
                                        <div className="single_math_line"/>
                                        <div className="single_math_text">HIDE SINGLE MATCH</div>
                                        <div className="single_math_line"/>
                                    </div>
                                    <div className="button_container_buttons">
                                        <Button
                                            uppercase={true}
                                            value="approved use"
                                            className="green"
                                            width="48%"
                                            height="100%"
                                            fontSize="10px"
                                            buttonIcon={acceptIcon}
                                        />
                                        <Button
                                            uppercase={true}
                                            value="Ignore"
                                            className="red"
                                            width="48%"
                                            height="100%"
                                            fontSize="10px"
                                            buttonIcon={ignoreIcon}
                                        />
                                    </div>
                                </div>
                            </div>








                        </div>
                    </div>


                    <div className="images_match_arrow_block">
                        <div>
                            <img src={rightArrow} alt="rightArrow"/>
                        </div>
                        <div className="match_arrow_text">next</div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ImagesMatch;