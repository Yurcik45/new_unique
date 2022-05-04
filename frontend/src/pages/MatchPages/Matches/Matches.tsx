import './Matches.sass';
import MatchesFull from './MatchesFull/MatchesFull';
import MatchesSearch from './MatchesSearch/MatchesSearch';


interface unseenProps {
    openModalHandler?: any,
    openNewModalHandler?: any,
    openModal?: boolean,
    tempArr?: any[],
    setTempArr?: any,
    searchValue?: string,
    setSearchValue?: any
}

const Matches = (props: unseenProps ) => {

    const filterIcon = <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.53516 0H2.36328V14.1406H1.19141V17.6562H2.36328V20H3.53516V17.6562H4.70703V14.1406H3.53516V0ZM3.53516 16.4844H2.36328V15.3125H3.53516V16.4844Z" fill="#959595"/>
        <path d="M18.8086 14.1406H17.6367V0H16.4648V14.1406H15.293V17.6562H16.4648V20H17.6367V17.6562H18.8086V14.1406ZM17.6367 16.4844H16.4648V15.3125H17.6367V16.4844Z" fill="#959595"/>
        <path d="M12.9492 0H11.7773V8.67188H10.6055V12.1875H11.7773V20H12.9492V12.1875H14.1211V8.67188H12.9492V0ZM12.9492 11.0156H11.7773V9.84375H12.9492V11.0156Z" fill="#959595"/>
        <path d="M8.22266 0H7.05078V2.09578H5.87891V5.61141H7.05078V20H8.22266V5.61141H9.39453V2.09578H8.22266V0ZM8.22266 4.43953H7.05078V3.26766H8.22266V4.43953Z" fill="#959595"/>
    </svg>
    const searchFiltersArr = [
        {item : 'Unseen matches'},
        {item : 'E-commerce matches'},
        {item : 'News & media matches'},
        {item : 'Unseen matches'},
        {item : 'Flagged'},
    ]

    return (
        <div className="dashboard_overview_mainBlock">
            {
                props?.tempArr ?
                    props.tempArr.length > 0 ?
                        <MatchesFull
                            openNewModalHandler={props.openNewModalHandler}
                            setTempArr={props.setTempArr}
                        />
                        :
                        <MatchesSearch/>
                    : null
            }
            {
                props?.tempArr ?
                    props.tempArr.length === 0
                        ?
                        <div className="filters_and_main_block_filters">
                            <div className="block_filters_header">
                                <div className="filters_header_icon">{filterIcon}</div>
                                Quick search filters
                            </div>
                            {
                                searchFiltersArr.map((s, id) => {
                                    return (

                                        <div
                                            key={id}
                                            className="block_filters_items"
                                            onClick={() => props.setSearchValue(s.item)}
                                        >
                                            {s.item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : null
                    : null
            }
    </div>
    )
}
export default Matches;