import {useEffect, useState} from 'react';
import './MatchesFull.sass';
import arrow from '../../../../assets/images/down-arrow 1.svg';
import { NavLink } from 'react-router-dom';
import matchesMenu from '../../../../assets/images/unseenMenu.png'
import matchesBurgerMenu from '../../../../assets/images/unseenBurgerMenu.png'
import matchesTakedownAction from '../../../../assets/images/unseenTakedAction.svg'
import matchesEmail from '../../../../assets/images/unseenEmail.svg'
import matchesIgnore from '../../../../assets/images/unseenIgnore.svg'
import matchesWhiteList from '../../../../assets/images/unseenWhiteList.svg'
import violetLogo from '../../../../assets/images/violetLogo.svg';
import { useDispatch, useSelector } from 'react-redux';
import {getMatches} from '../../../../redux/actions/matches'
import DashboardLeftFiltersBlock from '../../../../components/DashboardLeftFiltersBlock/DashboardLeftFiltersBlock';
import {ClickAwayListener} from "@material-ui/core";


import originalImgExample from '../../../../assets/images/matches/image.jpg'
import plagiatlImgExample from '../../../../assets/images/matches/plagiat.jpeg'


interface MatchesFullProps {
    openNewModalHandler: any,
    setTempArr: any
}

const MatchesFull = (props: MatchesFullProps) => {


    const dispatch = useDispatch();

    const[checked, checkHandler] = useState<{name: string, value: number}>({name: 'low', value: 20})

    // useEffect(() => {
    //     console.log("m");
        
    //     const skip = 0 ;
    //     const limit = 100 ;
    //     const startDate = '2021-03-12T15:35:50.272Z';
    //     const endDate = '2021-03-14T12:21:00.061Z'
    //     const reported = true ;
    //     const flagged = true ;
    //     const matches = true ;
    //     const online = true ;
    //     const sent_warning_email = true ;
    //     const false_positive = true ;
    //     const similarity_pct__gte = checked.value ;
    //     const violator_id = 0 ;
    //     //@ts-ignore
    //     dispatch(getMatches(skip, limit, startDate, endDate, reported, flagged, matches, online, sent_warning_email, false_positive, similarity_pct__gte, violator_id))
    // }, [dispatch, checked])


    //@ts-ignore
    const matchesData = useSelector(state => state.matches)

    const[groupOpen, groupOpenHandler] = useState<boolean>(false);
    const[groupValue, groupValueHandler] = useState<string>('bla bla bla max');
    const[sortOpen, sortOpenHandler] = useState<boolean>(false);
    const[sortValue, sortValueHandler] = useState<string>('bla bla bla max');
    const[sortDataOpen, sortDataOpenHandler] = useState<boolean>(false);
    const[sortDataValue, sortDataValueHandler] = useState<string>('bla bla bla max');
    const[rowView, setRowView] = useState<boolean | any>(false)
    const[star, starHandler] = useState<boolean>(false)
    const[seen, seenHandler] = useState<boolean>(false)


    const matchesArrow = <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L4 4L7 1" stroke="#909090"/>
    </svg>

    const nextPageArrows = <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.84 1.7875L5.18 3.8L0.84 5.795V7.265L6.79 4.36V3.24L0.84 0.3175V1.7875ZM8.33219 1.7875L12.6722 3.8L8.33219 5.795V7.265L14.2822 4.36V3.24L8.33219 0.3175V1.7875Z" fill="white"/>
    </svg>

    const starImage = <svg style={{marginBottom : "2px"}} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.7597 8.16437L14.0612 11.7696L14.9346 16.8616C14.9726 17.0843 14.8812 17.3093 14.6983 17.4423C14.595 17.5177 14.4721 17.5557 14.3492 17.5557C14.2548 17.5557 14.1598 17.5332 14.0731 17.4874L9.50003 15.0833L4.92756 17.4868C4.72806 17.5925 4.48522 17.5753 4.30234 17.4417C4.11947 17.3087 4.02803 17.0837 4.06603 16.861L4.93944 11.769L1.24038 8.16437C1.07888 8.00643 1.02009 7.77012 1.09016 7.55578C1.16022 7.34143 1.34606 7.18409 1.56991 7.15143L6.6815 6.40924L8.96744 1.7768C9.16753 1.37127 9.83253 1.37127 10.0326 1.7768L12.3186 6.40924L17.4302 7.15143C17.654 7.18409 17.8398 7.34084 17.9099 7.55578C17.98 7.77071 17.9212 8.00584 17.7597 8.16437Z" fill="#48519D"/>
    </svg>

    const check = <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.294 16.998C7.859 16.998 7.447 16.795 7.183 16.445L3.61 11.724C3.49953 11.5782 3.41888 11.4121 3.37267 11.2351C3.32645 11.0581 3.31557 10.8738 3.34064 10.6926C3.36572 10.5114 3.42626 10.3369 3.5188 10.1791C3.61135 10.0213 3.73409 9.88334 3.88 9.77302C4.02586 9.66225 4.19214 9.58134 4.36933 9.53495C4.54651 9.48856 4.73111 9.47759 4.91254 9.50267C5.09397 9.52776 5.26867 9.5884 5.42662 9.68112C5.58457 9.77384 5.72267 9.89683 5.833 10.043L8.184 13.147L14.095 3.65502C14.291 3.34162 14.6034 3.11877 14.9635 3.03535C15.3236 2.95192 15.7021 3.01474 16.016 3.21002C16.669 3.61602 16.87 4.47602 16.462 5.13002L9.478 16.34C9.35878 16.5322 9.19445 16.6925 8.99927 16.8068C8.8041 16.9211 8.58397 16.9861 8.358 16.996C8.336 16.998 8.316 16.998 8.294 16.998V16.998Z" fill="black"/>
    </svg>



    function close() {
        setTimeout(() => {
            groupOpenHandler(false)
            sortOpenHandler(false)
            sortDataOpenHandler(false)
        }, 7000)
    }
    const clickGroup = () => {groupOpenHandler(!groupOpen); close()}
    const clickSort = () => {sortOpenHandler(!sortOpen); close()}
    const clickSortData = () => {sortDataOpenHandler(!sortDataOpen); close()}

    const openModal = () => {props.openNewModalHandler(true)}

    let temp = {
        image_url: "image_url", // right url
        page_url: "string",
        found_date: "2021-03-10T15:17:12.118Z",
        reported: true,
        flagged: true,
        matches: true,
        online: true,
        sent_warning_email: true,
        false_positive: true,
        similarity_pct: 0,
        id: 0,
        original_image: {
            url: "left_image_url", // left url
            active: true,
            title: "string",
            sensitivity: 0,
            scans_completed: 0,
            tags: [
                {
                    text: "string",
                    id: 0
                }
            ],
            id: 0,
            user_id: "string"
        },
        violator: {
            platform: "categoty", // categoty
            isp: "UNDEFINED",
            email: "user@example.com",
            domain: "string",
            found_date: "2021-03-10T15:17:12.118Z", // first seen
            id: 0
        }
    }

    const matches = [
        {
            image_url: originalImgExample, // right url
            original_image: {
                url: plagiatlImgExample, // left url
            },
            violator: {
                platform: "category", // categoty
                found_date: "2021-03-10T15:17:12.118Z", // first seen
            }
        },

    ]

    const pageFilters = {
        group: ['group', 'group item', 'item'],
        sort: ['sort', 'sort item to', 'item'],
        data: ['data 1', 'data 2', 'data 3']
    }

    let n=[];
    let d = new Date('2021-03-10T15:17:12.118Z');
    let s = d.getUTCDate();
    n.push(s);
    s=d.getUTCMonth() + 1;
    n.push(s);
    s=d.getUTCFullYear();
    n.push(s);

    const[filters, setFilters] = useState<boolean>(false)
    console.log("filters m", filters);
    

    return (
        <div className="matchesPageContainer">


            <div className="matches_back_button_block">
                <NavLink to="/matches" onClick={() => props.setTempArr([])}>
                    <div className="matches_back_arrow">
                        <img src={arrow} alt=""/>
                    </div>
                    <div className="matches_back_text">
                        back
                    </div>
                </NavLink>
            </div>


            <div className="matches_mainLogo_container">
                <div className="matches_mailLogo"/>
                <div className="matches_textLogo">
                    { 30 + ' matches' }
                </div>
            </div>
            
            <div className="matchesPageMainBlock">


            <ClickAwayListener onClickAway={() => setFilters(false)}>
                <div className="matches_all_filters_block">


                    <div
                        onClick={() => setFilters(true)}
                        className="mobile_filters_button"
                    >
                        All filters
                    </div>

                    <div className={filters ? "matches_sort_filters_container" : "matches_sort_filters_container disable"}>

                        <div onClick={clickGroup} className="group_container">


                            <div className="group_filters pc_group">
                                <div className="filter_main_text">group by</div>
                                <div className="filter_selected_text">
                                    {groupValue}
                                </div>
                                <div className="filter_selected_arrow">{matchesArrow}</div>
                            </div>

                            <div className="group_filters mobile_group">
                                <div className="filter_item_and_arrow">
                                    <div className="filter_main_text">group by</div>
                                    <div className="filter_selected_arrow">{matchesArrow}</div>
                                </div>
                                <div className="filter_selected_text">
                                    {groupValue}
                                </div>
                            </div>




                            <div
                                style={{display: groupOpen ? "flex" : "none"}}
                                className="matches_group_items"
                            >

                                {
                                    pageFilters.group.map((g: string, id: number) => {
                                        return (
                                            <div
                                                key={id}
                                                onClick={ () => {groupValueHandler(g); setFilters(false)}}
                                                className="matches_group_item">
                                                <div className="group_item_text">
                                                    {g}
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>


                        </div>

                        <div className="matches_filters_text_container active">
                            <div className="matches_filters_text_original">
                                original
                            </div>
                            <div className="matches_filters_text_plagiat">
                                plagiator
                            </div>
                        </div>

                        <div
                            onClick={clickSort}
                            className="group_container">


                            <div className="group_filters pc_group">
                                <div className="filter_main_text">sort by</div>
                                <div className="filter_selected_text">
                                    {sortValue}
                                </div>
                                <div className="filter_selected_arrow">{matchesArrow}</div>
                            </div>

                            <div className="group_filters mobile_group">
                                <div className="filter_item_and_arrow">
                                    <div className="filter_main_text">sort by</div>
                                    <div className="filter_selected_arrow">{matchesArrow}</div>
                                </div>
                                <div className="filter_selected_text">
                                    {sortValue}
                                </div>
                            </div>

                            <div
                                //@ts-ignore
                                style={sortOpen ? null : {display: "none"} }
                                className="matches_group_items"
                            >


                                {
                                    pageFilters.sort.map((s: string, id: number) => {
                                        return (
                                            <div
                                                key={id}
                                                onClick={ () => {sortValueHandler(s); setFilters(false)}}
                                                className="matches_group_item">
                                                <div className="group_item_text">
                                                    {s}
                                                </div>
                                            </div>
                                        )
                                    })
                                }




                            </div>
                        </div>

                        <div
                            onClick={clickSortData}
                            className="group_container"
                        >


                            <div className="group_filters pc_group">
                                <div className="filter_main_text">data to</div>
                                <div className="filter_selected_text">
                                    {sortDataValue}
                                </div>
                                <div className="filter_selected_arrow">{matchesArrow}</div>
                            </div>


                            <div className="group_filters mobile_group">
                                <div className="filter_item_and_arrow">
                                    <div className="filter_main_text">data to</div>
                                    <div className="filter_selected_arrow">{matchesArrow}</div>
                                </div>
                                <div className="filter_selected_text">
                                    {sortDataValue}
                                </div>
                            </div>

                            <div
                                //@ts-ignore
                                style={sortDataOpen ? null : {display: "none"}}
                                className="matches_group_items"
                            >

                                {
                                    pageFilters.data.map((d: string, id: number) => {
                                        return (
                                            <div
                                                key={id}
                                                onClick={ () => { sortDataValueHandler(d); setFilters(false)}}
                                                className="matches_group_item">
                                                <div className="group_item_text">
                                                    {d}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>


                        </div>

                    </div>
                    
                    <div className="view_and_pages_set_container">



                        <div className="matches_view_set">
                            <div className="view_set_text">View</div>
                                <div
                                    onClick={() => setRowView(false)}
                                    className="view_set_groupRow"
                                >
                                    <img src={matchesBurgerMenu} alt="row"/>
                                </div>
                                <div
                                    onClick={() => setRowView(true)}
                                    className="view_set_groupWrap"
                                >
                                    <img src={matchesMenu} alt="wrap"/>
                                </div>
                        </div>
                        





                        <div className="matches_pages_set">
                            <div className="pages_set_text">Pages</div>
                            <div className="pages_set_blocks">
                                <div className="page_block">1</div>
                                <div className="page_block">2</div>
                                <div className="page_block">3</div>
                                <div className="pages_next_block"> {">>"} </div>
                            </div>
                        </div>


                    </div>

                </div>
            </ClickAwayListener>


               
                {/* <div style={{display: "none"}} className="matches_main_pictures_block"> */}
                <div className="matches_main_pictures_block">


                    <div className="matches_left_filters_block">
                        <div className="matches_filters_text_container nonActive">
                            <div className="matches_filters_text_original">
                                original
                            </div>
                            <div className="matches_filters_text_plagiat">
                                plagiator
                            </div>
                        </div>
                       <DashboardLeftFiltersBlock
                            check={check}
                            checked={checked}
                            checkHandler={checkHandler}
                       />
                    </div>


                    {
                        rowView ?
                            <div className="matches_image_items_horizontal_view_container">
                                {
                                    matches.map((match, id) => {
                                        return (
                                            <div key={id} className="matches_image_view_block">
                                                <div className="matches_image">
                                                    <img src={match.image_url} alt="plagiat"/>
                                                    <div className="matches_image_matches">
                                                        {/*{match.matches}*/}
                                                        20
                                                    </div>
                                                </div>
                                                {/*<div className="matches_image_description">*/}
                                                {/*    {pic.imageUrl}*/}
                                                {/*</div>*/}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className="matches_image_items_vertical_view_container">
                                {
                                    matches.map((match, id) => {
                                        return (
                                            <div
                                                onDoubleClick={() => starHandler(!star)}
                                                onClick={() => seenHandler(!seen)}
                                                key={id} className="matches_image_item"
                                            >



                                                <div className="image_item_photo_container">
                                                    <div className="image_item_photo">
                                                        <img src={match.original_image.url} alt="original"/>
                                                    </div>

                                                    <div className="image_item_photo">
                                                        <img src={match.image_url} alt="original"/>
                                                    </div>
                                                </div>





                                                <div className="image_item_description_block">


                                                    <div className="item_description_main">
                                                        <div className="description_main">
                                                            <div
                                                                className="main_matches_block">20 matches
                                                            </div>
                                                        </div>
                                                        <div className="description_main">
                                                            <div className="description_main_header">Page url</div>
                                                            {/*<div className="description_main_text">{match.pageUrl}</div>*/}
                                                        </div>
                                                        <div className="description_main">
                                                            <div className="description_main_header">Category</div>
                                                            <div className="description_main_text">{match.violator.platform}</div>
                                                        </div>
                                                        <div className="description_main">
                                                            <div className="description_main_header">first seen</div>
                                                            <div className="description_main_text">{match.violator.found_date}</div>
                                                        </div>
                                                    </div>


                                                    <div className="item_description_bottom">
                                                        <div className="description_bottom_header">Image url</div>
                                                        <a className="description_bottom_url" href={match.image_url} target='_blank' rel="noreferrer">
                                                            <p>
                                                                {"veryyyceryyyylooooooooooooooooooooongimageurllllllllllllllllllllll" + match.image_url}
                                                            </p>
                                                        </a>
                                                    </div>
                                                </div>






                                                <div className="item_button_star_seen_container">



                                                    <div className="image_item_button">
                                                        <div className="item_button_block">
                                                            removed
                                                        </div>
                                                    </div>


                                                    <div className="item_star_seen_container">

                                                        <div className="image_item_star">
                                                            <div
                                                                style={{display: star ? "flex" : "none"}}
                                                                className="item_star_block"
                                                            >
                                                                <img src={violetLogo} alt="violetLogo"/>
                                                            </div>
                                                        </div>

                                                        <div className="image_item_seen">
                                                            <div
                                                                style={{display: seen ? "flex" : "none"}}
                                                                className="item_seen_block"> {starImage}
                                                            </div>
                                                        </div>

                                                    </div>




                                                </div>






                                                
                                                
                                                <div className="matches_item_options_container">
                                                    <div className="item_options_container">
                                                        <div className="item_options">
                                                            <div className="option_icon">
                                                                <img src={matchesWhiteList} alt="matchesWhiteList"/>
                                                            </div>
                                                            <div className="option_text">white list</div>
                                                        </div>
                                                    </div>
                                                    <div className="item_options_container">
                                                        <div
                                                            title="Custom search (e.g. video copies, similar shops)"
                                                            onClick={openModal}
                                                            className="item_options">
                                                            <div className="option_icon">
                                                                <img src={matchesIgnore} alt="matchesIgnore"/>
                                                            </div>
                                                            <div className="option_text">Ignore</div>
                                                        </div>
                                                    </div>
                                                    <div className="item_options_container">
                                                        <div className="item_options">
                                                            <div className="option_icon">
                                                                <img src={matchesTakedownAction} alt="matchesTakedownAction"/>
                                                            </div>
                                                            <div className="option_text">takedown action</div>
                                                        </div>

                                                    </div>
                                                    <div className="item_options_container">
                                                        <div className="item_options">
                                                            <div className="option_icon">
                                                                <img src={matchesEmail} alt="matchesEmail"/>
                                                            </div>
                                                            <div className="option_text">warning Email</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MatchesFull;