import { useState } from 'react'
import './DashboardLeftFiltersBlock.sass'
import {ClickAwayListener} from "@material-ui/core";

interface LeftFilters {
    check?: any,
    checkHandler?: any,
    checked?: any
}

const DashboardLeftFiltersBlock = (props: LeftFilters) => {


    const matchesArrow = <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L4 4L7 1" stroke="#909090"/>
    </svg>

    const[filters, setFilters] = useState<boolean>(false)

    console.log("filters sim m :", filters);
    

    return (
        <ClickAwayListener onClickAway={() => setFilters(false)}>
            <div className="left_filters_block">
                <div
                    onClick={() => setFilters(!filters)}
                    className="left_filter_headers_container"
                >
                    <div className="left_filter_header">Filter</div>
                    <div className="left_filter_second_header">similarity</div>
                    <div className="left_filter_arrow mobile"
                    >{matchesArrow}</div>
                </div>
                <div
                    className={
                        filters
                        ? "left_filters_container"
                        : "left_filters_container disable"
                    }
                >
                    <div
                        onClick={() => {props.checkHandler({name: 'high', value: 80}); setFilters(false)}}
                        className="left_filter_items"
                    >
                        <div className="filter_items_check">
                            { props.checked.name === 'high' ? props.check : null}
                        </div>
                        <div className="filter_items_text">High</div>
                    </div>
                    <div
                        onClick={() => {props.checkHandler({name: 'medium', value: 50}); setFilters(false)}}
                        className="left_filter_items"
                    >
                        <div className="filter_items_check">
                            { props.checked.name === 'medium' ? props.check : null}
                        </div>
                        <div className="filter_items_text">Medium</div>
                    </div>
                    <div
                        onClick={() => {props.checkHandler({name: 'low', value: 20}); setFilters(false)}}
                        className="left_filter_items"
                    >
                        <div className="filter_items_check">
                            { props.checked.name === 'low' ? props.check : null}
                        </div>
                        <div className="filter_items_text">Low</div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default DashboardLeftFiltersBlock;