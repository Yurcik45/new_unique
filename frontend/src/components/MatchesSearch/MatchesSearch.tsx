import { useState } from 'react'
import './MatchesSearch.sass';
import Input from '../UI/Input/Input'

export interface matchesSearch {
    barMenuArray?: any[],
    searchOpenHandler?: any,
    searchOpen?: boolean,
    tempArr?: any[],
    searchValue?: string,
    setSearchValue?: any
}

const MatchesSearch = (props: matchesSearch) => {

    // Value from main top search
    const [searchOpen] = useState<boolean | any>(false)


    const getSearchValue = (value: React.ChangeEvent<HTMLInputElement>) => {
        if (props?.setSearchValue) {
            props.setSearchValue(value.target.value)
        }
    }

    const searchIcon = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.60568 0C2.96341 0 0 2.96341 0 6.60568C0 10.2482 2.96341 13.2114 6.60568 13.2114C10.2482 13.2114 13.2114 10.2482 13.2114 6.60568C13.2114 2.96341 10.2482 0 6.60568 0ZM6.60568 11.9919C3.63577 11.9919 1.21951 9.57562 1.21951 6.60571C1.21951 3.6358 3.63577 1.21951 6.60568 1.21951C9.57559 1.21951 11.9919 3.63577 11.9919 6.60568C11.9919 9.57559 9.57559 11.9919 6.60568 11.9919Z" fill="#D7DDE2"/>
        <path d="M14.822 13.9598L11.326 10.4638C11.0878 10.2256 10.702 10.2256 10.4638 10.4638C10.2256 10.7018 10.2256 11.088 10.4638 11.326L13.9598 14.822C14.0789 14.9411 14.2348 15.0006 14.3909 15.0006C14.5468 15.0006 14.7028 14.9411 14.822 14.822C15.0602 14.584 15.0602 14.1978 14.822 13.9598Z" fill="#D7DDE2"/>
    </svg>;

    return (
        <div
        //@ts-ignore
        style={(window.location.pathname === '/matches' && props?.tempArr ? props.tempArr.length === 0 : null) || searchOpen ? {
            backgroundColor: "white",
            boxShadow: "0px 3px 4px rgba(100, 100, 140, 0.2)"
        } : null}
        className="MatchesSearchContainer"
    >


        <div className="searchInput">
            <Input
                width="100%"
                className="MainInput"
                height="calc(100% - 15px)"
                placeholder={(window.location.pathname === '/matches' && props?.tempArr ? props.tempArr.length === 0 : null) ? "Search for name, country, category ..." : "Search "}
                mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => getSearchValue(value)}
                name="main_search"
                value={props.searchValue}
            />
            <div
                onClick={() => ('search clicked')}
                className="marchesSearchIcon"
            >
                {searchIcon}
            </div>
        </div>





        <div
            onClick={() => ('question clicked')}
            className="questionBlock"
        >
            <div className="questionItemBorder">
                <div className="questionItem">?</div>
            </div>
        </div>

    </div>
    )
}

export default MatchesSearch;