import { useEffect, useState} from 'react';
import "./Dashboard.sass"
import { useSelector ,useDispatch } from "react-redux";
import {getDashboardData} from '../../redux/actions/dashboard'

import ReactCalendar from "./ReactCalendar/ReactCalendar";
import MyResponsiveBar from '../../components/NivoLineChart/MyResponsiveBar';
import ReactD3Pie from '../../components/ReactD3Pie/ReactD3Pie';



import DashboardTopMenu from "../../components/DashboardTopMenu/DashboardTopMenu";


const Dashboard = () => {

    let date = new Date().toISOString()
    console.log(date);
    

    const [selectedDayRange, setSelectedDayRange] = useState(
        {
            from: {
                year: 2021,
                month: 1,
                day: 1
            },
            to: {
                year: 2021,
                month: 1,
                day: 2
            }
        }
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedDayRange.from !== null && selectedDayRange.to !== null) {
            const from = new Date(`${selectedDayRange.from.month} ${selectedDayRange.from.day + 1} ${selectedDayRange.from.year}`)
            const to = new Date(`${selectedDayRange.to.month} ${selectedDayRange.to.day + 1} ${selectedDayRange.to.year}`)
            // dispatch(getDashboardData(from, to))
            console.log("from", from.toISOString, "to", to.toISOString);
            
        }
    }, [dispatch, selectedDayRange])

    //@ts-ignore
    const dashboardData = useSelector(state => state.dashboard);

    // SET FINAL PIE DATES
    const pieData = {
        firstPie: [
            {label: 'online', value: dashboardData.online_matches_number , dotsColor: '#840090'},
            {label: 'Removed', value: dashboardData.removed_matches_number, dotsColor: '#580080'},
            {label: 'reported', value: dashboardData.reported_matches_number , dotsColor: '#007890'}
        ],
        secondPie: [
            {label: '1-5 detections amount by web', value: dashboardData.small_violators_number , dotsColor: '#840090'},
            {label: '6-10', value: dashboardData.middle_violators_number , dotsColor: '#580080'},
            {label: '10+', value: dashboardData.big_violators_number , dotsColor: '#007890'},
        ],
        thirdPie: [
            {label: '1-10', value: dashboardData.little_plagiated_images_number , dotsColor: '#840090'},
            {label: '11-30', value: dashboardData.medium_plagiated_images_number , dotsColor: '#580080'},
            {label: '31+', value: dashboardData.very_plagiated_images_number, dotsColor: '#007890'}
        ]
    }

    // calendar settings
    // const [selectedDay, setSelectedDay] = useState(null);

   
    let refactorFromMonth: number = selectedDayRange?.from?.day ? selectedDayRange?.from.month : 16
    let refactorToMonth: number = selectedDayRange?.to?.day ? selectedDayRange?.to.month : 19

    let needFromMonth: string;
    let needToMonth: string;

    // set month name in html
    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Cct.", "Nov.", "Dec."];
    let monthResult;
    const selectMonth = (number: number) => {
        for (let i = 0; i < months.length + 1; i++) {
            if (number === i) {
                return monthResult = months[i - 1]
            }
        }
    }
    selectMonth(refactorFromMonth)
    //@ts-ignore
    needFromMonth = monthResult
    selectMonth(refactorToMonth)
    //@ts-ignore
    needToMonth = monthResult


    // ---- SET WEEK LOGIC END ---- //


    const calendarImage = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.125 1.25H13.375V0H12.125V1.25H3.875V0H2.625V1.25H1.875C0.841125 1.25 0 2.09113 0 3.125V14.125C0 15.1589 0.841125 16 1.875 16H14.125C15.1589 16 16 15.1589 16 14.125V3.125C16 2.09113 15.1589 1.25 14.125 1.25ZM14.75 14.125C14.75 14.4696 14.4696 14.75 14.125 14.75H1.875C1.53038 14.75 1.25 14.4696 1.25 14.125V5.875H14.75V14.125ZM14.75 4.625H1.25V3.125C1.25 2.78038 1.53038 2.5 1.875 2.5H2.625V3.75H3.875V2.5H12.125V3.75H13.375V2.5H14.125C14.4696 2.5 14.75 2.78038 14.75 3.125V4.625Z"
            fill="#48519D"/>
        <path d="M3.625 7.1875H2.375V8.4375H3.625V7.1875Z" fill="#48519D"/>
        <path d="M6.125 7.1875H4.875V8.4375H6.125V7.1875Z" fill="#48519D"/>
        <path d="M8.625 7.1875H7.375V8.4375H8.625V7.1875Z" fill="#48519D"/>
        <path d="M11.125 7.1875H9.875V8.4375H11.125V7.1875Z" fill="#48519D"/>
        <path d="M13.625 7.1875H12.375V8.4375H13.625V7.1875Z" fill="#48519D"/>
        <path d="M3.625 9.6875H2.375V10.9375H3.625V9.6875Z" fill="#48519D"/>
        <path d="M6.125 9.6875H4.875V10.9375H6.125V9.6875Z" fill="#48519D"/>
        <path d="M8.625 9.6875H7.375V10.9375H8.625V9.6875Z" fill="#48519D"/>
        <path d="M11.125 9.6875H9.875V10.9375H11.125V9.6875Z" fill="#48519D"/>
        <path d="M3.625 12.1875H2.375V13.4375H3.625V12.1875Z" fill="#48519D"/>
        <path d="M6.125 12.1875H4.875V13.4375H6.125V12.1875Z" fill="#48519D"/>
        <path d="M8.625 12.1875H7.375V13.4375H8.625V12.1875Z" fill="#48519D"/>
        <path d="M11.125 12.1875H9.875V13.4375H11.125V12.1875Z" fill="#48519D"/>
        <path d="M13.625 9.6875H12.375V10.9375H13.625V9.6875Z" fill="#48519D"/>
    </svg>
    const dashboardCalendarArrow = <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L5 5.5L9 1.5" stroke="#48519D" strokeWidth="2"/></svg>


    const[showOptions, setShowOptions] = useState<boolean>(false)

    const closeSettings = () => {
        setShowOptions(false)
    }

    const openSettings = () => {
        setShowOptions(true)
    }

    // @ts-ignore
    return (
        <div className="DashboardGeneralPageContainer">
                <DashboardTopMenu/>

            <div className="dashboard_overview_mainBlock">


                <div className="dashboard_setDates_block">
                    <div className="dashboard_setDates_check">
                        <div className="dashboard_setDates_check_text">Showing for:</div>
                        <div
                            onClick={openSettings}
                            className="dashboard_setCalendarData_block"
                        >
                            <div className="dashboard_setDates_calendar_image">
                                {calendarImage}
                            </div>
                            {
                                showOptions ?
                                    <ReactCalendar
                                        closeSettings={closeSettings}
                                        selectedDayRange={selectedDayRange}
                                        setSelectedDayRange={setSelectedDayRange}
                                    />
                                    : null
                            }
                            <div
                                className="dashboard_setDates_check_calendar"
                            >
                                {selectedDayRange?.from?.day ? selectedDayRange?.from.day: ' from'}
                                {needFromMonth}
                                -
                                {selectedDayRange?.to?.day ? selectedDayRange?.to.day: ' to '}
                                {needToMonth}
                                2021
                            </div>

                        </div>
                        <div className="dashboard_calendar_arrow">
                            {dashboardCalendarArrow}
                        </div>
                    </div>
                </div>

                <div className='dashboard_lineChart_block'>
                    <MyResponsiveBar
                        data={dashboardData.bar_chart_data}
                    />
                </div>
                <div className="pie_Block">
                    <ReactD3Pie
                        data={pieData.firstPie}
                        innerRadius="120"
                        outerRadius="150"
                        centerText='status'
                        descriptionText='status of the detections'
                        pieId='first-pie-container'
                    />
                    <ReactD3Pie
                        data={pieData.secondPie}
                        innerRadius="120"
                        outerRadius="150"
                        centerText='domains'
                        descriptionText='statistics of detected websites by copies amount'
                        pieId='second-pie-container'
                    />
                    <ReactD3Pie
                        data={pieData.thirdPie}
                        innerRadius="120"
                        outerRadius="150"
                        centerText='images'
                        descriptionText='statistics of copied images by copies amount'
                        pieId='third-pie-container'
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;