import './ReactCalendar.sass'
import { Calendar } from 'react-modern-calendar-datepicker';
import '../useDatePicker.css';
import Button from "../../../components/UI/Button/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface CalendarProps {
    selectedDayRange: any,
    setSelectedDayRange: any,
    closeSettings: any
}

const ReactCalendar = (props: CalendarProps) => {

    // ---- SET WEEK LOGIC ---- //

    // lifetime

    const lifeTimeDays = () => {
        let lifeDays: any = {
            from: {},
            to: {}
        };

        let userNowDate = new Date()
        let userNowYear = userNowDate.getFullYear()
        let userNowMonth = userNowDate.getMonth() + 1
        let userNowDay = userNowDate.getDate()


        let dateNow = new Date(userNowYear, userNowMonth, userNowDay);
        let userRegisterDate = new Date(2019, 10, 7);

        let different = 0;
        //@ts-ignore
        function diffDates(d2, d1) {
            return different = (d2 - d1) / (60 * 60 * 24 * 1000);
        }

        diffDates(dateNow, userRegisterDate);

        let needDate = new Date();
        needDate.setDate(needDate.getDate() - different);


        lifeDays.from['year'] = needDate.getFullYear();
        lifeDays.from['month'] = needDate.getMonth() + 1;
        lifeDays.from['day'] = needDate.getDate();

        lifeDays.to['year'] = userNowYear
        lifeDays.to['month'] = userNowMonth
        lifeDays.to['day'] = userNowDay

        props.setSelectedDayRange(lifeDays)

        ('lifeDays :', lifeDays)
    }
    // lifeTimeDays()

    // last 7 days

    const lastSevenDays = () => {
        let sevenDays: any = {
            from: {},
            to: {}
        };

        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()


        let secondDate = new Date();
        secondDate.setDate(secondDate.getDate() - 7);


        sevenDays.from['year'] = secondDate.getFullYear()
        sevenDays.from['month'] = secondDate.getMonth() + 1
        sevenDays.from['day'] = secondDate.getDate()

        sevenDays.to['year'] = year
        sevenDays.to['month'] = month
        sevenDays.to['day'] = day

        props.setSelectedDayRange(sevenDays)

        ('sevenDays :', sevenDays)
    }
    // lastSevenDays()

    // last 14 days

    const lastFourteenDays = () => {
        let fourteenDays: any = {
            from: {},
            to: {}
        };

        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()


        let newNeedDate = new Date();
        newNeedDate.setDate(newNeedDate.getDate() - 14);


        fourteenDays.from['year'] = newNeedDate.getFullYear()
        fourteenDays.from['month'] = newNeedDate.getMonth() + 1
        fourteenDays.from['day'] = newNeedDate.getDate()

        fourteenDays.to['year'] = year
        fourteenDays.to['month'] = month
        fourteenDays.to['day'] = day

        props.setSelectedDayRange(fourteenDays)

        ('fourteenDays :', fourteenDays)
    }
    // lastFourteenDays()

    // last 30 days

    const lastThirtyDays = () => {
        let thirtyDays: any = {
            from: {},
            to: {}
        };

        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()


        let needDate = new Date();
        needDate.setDate(needDate.getDate() - 30);


        thirtyDays.from['year'] = needDate.getFullYear()
        thirtyDays.from['month'] = needDate.getMonth() + 1
        thirtyDays.from['day'] = needDate.getDate()

        thirtyDays.to['year'] = year
        thirtyDays.to['month'] = month
        thirtyDays.to['day'] = day

        props.setSelectedDayRange(thirtyDays)

        ('thirtyDays :', thirtyDays)
    }
    // lastThirtyDays()

    // last week

    const setLastWeek = () => {
        let lastWeek: any = {
            from: {},
            to: {}
        }

        let selectWeek: any = {
            from: {},
            to: {}
        }

        let date = new Date()
        let monthNow = date.getMonth() + 1

        let today = new Date().getDate()

        let lastMonth: any = new Date(2021, monthNow - 1, 1);
        let thisMonth: any = new Date(2021, monthNow, 1);
        let daysOfThisMonths = Math.round((thisMonth - lastMonth) / 1000 / 3600 / 24);

        for (let i = 1; i <= daysOfThisMonths; i++) {
            let date = new Date(`${monthNow} ${i}, 2021`); // 1 - monday ; 0 - sunday
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDay()
            let monthDay = date.getDate()
            if ( day - 1 === 0 && monthDay <= today && monthDay > (today - 7) ) {
                selectWeek.from['year'] = year
                selectWeek.from['month'] = month
                selectWeek.from['day'] = monthDay
            }
            if ( day === 0 && monthDay >= today && monthDay < (today + 7) ) {
                selectWeek.to['year'] = year
                selectWeek.to['month'] = month
                selectWeek.to['day'] = monthDay
            }
        }



        let needFromDate = new Date(`${selectWeek.from.year} ${selectWeek.from.month + 1}, ${selectWeek.from.day}`);
        needFromDate.setDate(needFromDate.getDate() - 7);

        let neeTodDate = new Date(`${selectWeek.to.year} ${selectWeek.to.month + 1}, ${selectWeek.to.day}`);
        neeTodDate.setDate(neeTodDate.getDate() - 7);

        lastWeek.from['year'] = needFromDate.getFullYear()
        lastWeek.from['month'] = needFromDate.getMonth() + 1
        lastWeek.from['day'] = needFromDate.getDate()

        lastWeek.to['year'] = neeTodDate.getFullYear()
        lastWeek.to['month'] = neeTodDate.getMonth() + 1
        lastWeek.to['day'] = neeTodDate.getDate()

        props.setSelectedDayRange(lastWeek)

        ('lastWeek', lastWeek)
    }
    // setLastWeek()

    // this week


    const setThisWeek = () => {
        let selectWeek: any = {
            from: {},
            to: {}
        }

        let date = new Date()
        let monthNow = date.getMonth() + 1

        let today = new Date().getDate()

        let lastMonth: any = new Date(2021, monthNow - 1, 1);
        let thisMonth: any = new Date(2021, monthNow, 1);
        let daysOfThisMonths = Math.round((thisMonth - lastMonth) / 1000 / 3600 / 24);

        for (let i = 1; i <= daysOfThisMonths; i++) {
            let date = new Date(`${monthNow} ${i}, 2021`); // 1 - monday ; 0 - sunday
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDay()
            let monthDay = date.getDate()
            if ( day - 1 === 0 && monthDay <= today && monthDay > (today - 7) ) {
                selectWeek.from['year'] = year
                selectWeek.from['month'] = month
                selectWeek.from['day'] = monthDay
            }
            if ( day === 0 && monthDay >= today && monthDay < (today + 7) ) {
                selectWeek.to['year'] = year
                selectWeek.to['month'] = month
                selectWeek.to['day'] = monthDay
            }
        }

        props.setSelectedDayRange(selectWeek)

        ('selectWeek', selectWeek)

    }

    // this month

    const setThisMonth = () => {
        let thisMonth: any = {
            from: {},
            to: {}
        }

        let nowYear = new Date().getFullYear()
        let nowMonth = new Date().getMonth() + 1
        let nowDay = new Date().getDate()

        let needDate = new Date(`${nowMonth} 1, ${nowYear}`)

        thisMonth.from['year'] = needDate.getFullYear()
        thisMonth.from['month'] = needDate.getMonth() + 1
        thisMonth.from['day'] = needDate.getDate()

        thisMonth.to['year'] = nowYear
        thisMonth.to['month'] = nowMonth
        thisMonth.to['day'] = nowDay

        props.setSelectedDayRange(thisMonth)

        ('thisMonth', thisMonth)
    }
    // setThisMonth()

    // last month

    const setLastMonth = () => {
        let lastMonth: any = {
            from: {},
            to: {}
        }

        // найти дату початку попереднього місяця

        let getLastMonth = new Date().getMonth() + 1
        let getYear = new Date().getFullYear()
        let lastDate = new Date(`${getLastMonth} 1, ${getYear}`)


        // найти різницю між попереднім і поточним місяцем для того щоб взнати кількість днів минулого місяця
        let nowYear = new Date().getFullYear()
        let nowMonth = new Date().getMonth() + 1
        let nowDate = new Date().getDate()



        let setLstMonth: any = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate());
        let thisMonth: any = new Date(nowYear, nowMonth, nowDate);
        let daysOfThisMonths = Math.round((thisMonth - setLstMonth) / 1000 / 3600 / 24);


        let finalDate = new Date();
        finalDate.setDate(finalDate.getDate() - daysOfThisMonths);

        lastMonth.from['year'] = finalDate.getFullYear()
        lastMonth.from['month'] = finalDate.getMonth()
        lastMonth.from['day'] = finalDate.getDate()

        lastMonth.to['year'] = nowYear
        lastMonth.to['month'] = nowMonth
        lastMonth.to['day'] = 1

        props.setSelectedDayRange(lastMonth)

    }
    // setLastMonth()




    return (
        <ClickAwayListener onClickAway={props.closeSettings}>
            <div className="dashboard_custom_calendar_block" >
                <Calendar
                    value={props.selectedDayRange}
                    //@ts-ignore
                    onChange={props.setSelectedDayRange}
                    colorPrimary="#0fbcf9"
                    colorPrimaryLight="rgba(75, 207, 250, 0.4)"
                    shouldHighlightWeekends
                    //@ts-ignore
                    calendarPopperPosition='bottom'
                    calendarClassName="calendar"
                />
                    <div className="dashboard_calendar_button_container">
                            <Button
                                uppercase={true}
                                value="last 7 days"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => lastSevenDays()}
                            />
                            <Button
                                uppercase={true}
                                value="last 14 Days"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => lastFourteenDays()}
                            />
                            <Button
                                uppercase={true}
                                value="last 30 Days"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => lastThirtyDays()}
                            />
                            <Button
                                uppercase={true}
                                value="Last Week"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => setLastWeek()}
                            />
                            <Button
                                uppercase={true}
                                value="This Week"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => setThisWeek()}
                            />
                            <Button
                                uppercase={true}
                                value="Last Month"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => setLastMonth()}
                            />
                            <Button
                                uppercase={true}
                                value="This Month"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => setThisMonth()}
                            />
                            <Button
                                uppercase={true}
                                value="lifeTime"
                                className="white"
                                width="calc(100% - 10px)"
                                height="25px"
                                fontSize="10px"
                                mainButtonClicked={() => lifeTimeDays()}
                            />
                    </div>
            </div>
        </ClickAwayListener>
    );
};

export default ReactCalendar;