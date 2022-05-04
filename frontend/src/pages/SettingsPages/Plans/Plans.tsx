import { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import './Plans.sass'
import leftArrow from '../../../assets/images/imagesMatchLeftArrov.png';
import rightArrow from '../../../assets/images/imagesMatchRightArrow.png';


const Plans = () => {

    const greenCheckIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.5364 5.46155C11.7805 5.70569 11.7805 6.10144 11.5364 6.34546L7.34351 10.5385C7.09937 10.7825 6.70374 10.7825 6.45959 10.5385L4.46362 8.54236C4.21948 8.29834 4.21948 7.90259 4.46362 7.65857C4.70764 7.41443 5.10339 7.41443 5.34741 7.65857L6.90149 9.21265L10.6525 5.46155C10.8966 5.21753 11.2924 5.21753 11.5364 5.46155ZM16 8C16 12.422 12.4214 16 8 16C3.578 16 0 12.4214 0 8C0 3.578 3.57861 0 8 0C12.422 0 16 3.57861 16 8ZM14.75 8C14.75 4.26892 11.7306 1.25 8 1.25C4.26892 1.25 1.25 4.26941 1.25 8C1.25 11.7311 4.26941 14.75 8 14.75C11.7311 14.75 14.75 11.7306 14.75 8Z"
            fill="#00C537"/>
    </svg>

    const redCheckIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 8C16 12.422 12.4214 16 8 16C3.578 16 0 12.4214 0 8C0 3.578 3.57861 0 8 0C12.422 0 16 3.57861 16 8ZM14.75 8C14.75 4.26892 11.7306 1.25 8 1.25C4.26892 1.25 1.25 4.26941 1.25 8C1.25 11.7311 4.26941 14.75 8 14.75C11.7311 14.75 14.75 11.7306 14.75 8Z"
            fill="#C50000"/>
        <path
            d="M8.5497 7.99998L10.886 5.66363C11.038 5.51166 11.038 5.26595 10.886 5.11398C10.734 4.96201 10.4883 4.96201 10.3363 5.11398L7.99997 7.45033L5.66369 5.11398C5.51165 4.96201 5.266 4.96201 5.11403 5.11398C4.96199 5.26595 4.96199 5.51166 5.11403 5.66363L7.45032 7.99998L5.11403 10.3363C4.96199 10.4883 4.96199 10.734 5.11403 10.886C5.18977 10.9618 5.28935 10.9999 5.38886 10.9999C5.48837 10.9999 5.58788 10.9618 5.66369 10.886L7.99997 8.54964L10.3363 10.886C10.4121 10.9618 10.5116 10.9999 10.6112 10.9999C10.7107 10.9999 10.8102 10.9618 10.886 10.886C11.038 10.734 11.038 10.4883 10.886 10.3363L8.5497 7.99998Z"
            fill="#C50000"/>
    </svg>



    const plansArray = [
        {
            name: 'Standard',
            price: '0',
            profit: '$1 per image',
            term: 'FREE',
            description: 'Ideal for new creators, or those who just want to try out features',
            benefits: [
                {
                    icon: greenCheckIcon,
                    benefit: 'Detect all copies of selected products'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Report in-app and by mail'
                },
                {
                    icon: redCheckIcon,
                    benefit: 'Send warnings to plagiators by Email'
                },
                {
                    icon: redCheckIcon,
                    benefit: 'Report plagiators on their platform (Shopify DMCA report)'
                },
                {
                    icon: redCheckIcon,
                    benefit: 'Report plagiators\' shops to search engines (e.g. Google, Bing, Yahoo)'
                },
                {
                    icon: redCheckIcon,
                    benefit: 'Custom search (e.g. video copies, similar shops)'
                }
            ],
            buttonValue: 'Current plan',
            buttonFont: 'gray',
            buttonClassname: 'white',
            current: false
        },
        {
            name: 'Premium',
            price: '19,99',
            profit: '$0,5 per image',
            term: 'Per month',
            description: 'Ideal for new creators, or those who just want to try out features',
            benefits: [
                {
                    icon: greenCheckIcon,
                    benefit: 'Detect all copies of selected products'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Report in-app and by mail'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Send warnings to plagiators by Email'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Report plagiators on their platform (Shopify DMCA report)'
                },
                {
                    icon: redCheckIcon,
                    benefit: 'Report plagiators\' shops to search engines (e.g. Google, Bing, Yahoo)'
                },
                {
                    icon: redCheckIcon,
                    benefit: 'Custom search (e.g. video copies, similar shops)'
                }
            ],
            buttonValue: 'Buy now',
            buttonFont: 'green',
            buttonClassname: 'white',
            current: false
        },
        {
            name: 'Custom',
            price: '19,99+',
            profit: '',
            term: 'Per month',
            description: 'Ideal for new creators, or those who just want to try out features',
            benefits: [
                {
                    icon: greenCheckIcon,
                    benefit: 'Detect all copies of selected products'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Report in-app and by mail'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Send warnings to plagiators by Email'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Report plagiators on their platform (Shopify DMCA report)'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Report plagiators\' shops to search engines (e.g. Google, Bing, Yahoo)'
                },
                {
                    icon: greenCheckIcon,
                    benefit: 'Custom search (e.g. video copies, similar shops)'
                }
            ],
            buttonValue: 'Contact us',
            buttonFont: 'green',
            buttonClassname: 'white',
            current: true
        }
    ]

    const currentStyes = {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px"
    }

    const [scroll, setScroll] = useState<number>(0)

    // 650
    const scrollLeft = () => {
        if (scroll <= 0) {
            setScroll(scroll + 1)
        }
    }
    // -650
    const scrollRight = () => {
        if (scroll >= 0) {
            setScroll(scroll - 1)
        }
    }

    console.log("scroll", scroll);
    


    return (

        <div className="prof_plans_mainBlock">

            {/* <div onClick={scrollLeft} className="arrow_left"><img src={leftArrow} alt="Left"/></div> */}
            {/* <div onClick={scrollRight} className="arrow_right"><img src={rightArrow} alt="right"/></div> */}

            <div className="scrollContainer">
                <div onClick={scrollLeft} className="arrow_left"><img src={leftArrow} alt="Left"/></div>
                <div 
                    style={scroll === 1 ? {border: "2px solid #48519D", color: "black"} : undefined}
                    onClick={() => setScroll(1)}
                    className="scrollNumber">
                        1
                </div>
                <div 
                    style={scroll === 0 ? {border: "2px solid #48519D", color: "black"} : undefined}
                    onClick={() => setScroll(0)}
                    className="scrollNumber">
                        2
                </div>
                <div 
                    style={scroll === -1 ? {border: "2px solid #48519D", color: "black"} : undefined}
                    onClick={() => setScroll(-1)}
                    className="scrollNumber">
                        3
                </div>
                <div onClick={scrollRight} className="arrow_right"><img src={rightArrow} alt="right"/></div>
            </div>

            <div 
                className={ scroll === -1 ? "prof_plans_top l" : scroll === 1 ? "prof_plans_top r" : "prof_plans_top c"}
            >
                <div className="prof_plans_topItems">
                    <div className="prof_plans_topItems_mainText">Standard</div>
                    <div className="prof_plans_topItems_text">Current plan</div>
                </div>
                <div className="prof_plans_topItems">
                    <div className="prof_plans_topItems_text">Images monitored</div>
                    <div className="prof_plans_topItems_mainText">10</div>
                    <div className="prof_plans_topItems_text">of the 500 included in your plan</div>
                </div>
                <div className="prof_plans_topItems">
                    <div className="prof_plans_topItems_text">Takedown notices sent</div>
                    <div className="prof_plans_topItems_mainText">0</div>
                    <div className="prof_plans_topItems_text">of the 0 included in your plan</div>
                </div>
            </div>

            <div className={ scroll === -1 ? "prof_plans_bottom l" : scroll === 1 ? "prof_plans_bottom r" : "prof_plans_bottom c"}>
                {
                    plansArray.map((plans, id) => {
                        return (
                            <div key={id} className="prof_plans_bottomItems">

                                {
                                    plans.current ?
                                        <div className="prof_plans_bottom_selected">Current plan</div>
                                        : null
                                }


                                <div
                                    //@ts-ignore
                                    style={plans.current ? currentStyes : null}
                                    className="prof_plans_bottom_Container">

                                    <div className="prof_plans_bottom_header">{plans.name}</div>
                                    <div className="prof_plans_bottom_priceContainer">
                                        <div className="prof_plans_bottom_costContainer">
                                            <div className="prof_plans_bottom_costDollar">
                                                $
                                            </div>
                                            <div className="prof_plans_bottom_costPrice">{plans.price}</div>
                                        </div>
                                        <div className="prof_plans_bottom_text">{plans.profit}</div>
                                        <div className="prof_plans_bottom_textBottom">{plans.term}</div>
                                    </div>
                                    <div className="prof_plans_bottom_description">{plans.description}</div>

                                    {
                                        plans.benefits.map((benef, id) => {
                                            return (
                                                <div key={id} className="prof_plans_bottom_benefitsContainer">
                                                    <div className="prof_plans_bottom_benefitsItemsContainer">
                                                        <div className="prof_plans_bottom_benefitsIcon">{benef.icon}</div>
                                                        <div
                                                            className="prof_plans_bottom_benefitsItem">{benef.benefit}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="prof_plans_bottom_buyButtonContainer">
                                        <Button
                                            buttonType="login"
                                            value={plans.buttonValue}
                                            fontStyle={plans.buttonFont}
                                            width="210px"
                                            height="50px"
                                            disabled={plans.current ? true : false}
                                            className={plans.buttonClassname}
                                            mainButtonClicked={() => console.log('clicked')}
                                            //@ts-ignore
                                            color={plans.current ? '#979797': null}
                                        />
                                    </div>

                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Plans;
