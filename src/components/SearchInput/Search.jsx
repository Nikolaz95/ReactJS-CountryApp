import React, { useEffect, useRef, useState } from 'react'


//import css
import "./Search.css"

//import  icons
import searchImg from "../../assets/icon-search.png"

const Search = ({ searchValue, setSearchValue }) => {
    const onClickFocus = useRef(null);

    const handleInputFocus = () => {
        onClickFocus.current.focus();
    };

    // Update the search value when typing
    const handleShowCntry = (e) => {
        setSearchValue(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };

    return (
        <div className="search-content">
            <form className="form-content">
                <input type="text"
                    ref={onClickFocus}
                    value={searchValue}
                    onChange={handleShowCntry}
                    className="searchCountry"
                    placeholder="Search for the country" />
                <div className="searchIcon">
                    <img onClick={handleInputFocus} src={searchImg} alt="" className='iconSearch' />
                </div>
            </form>
        </div>
    )
}

export default Search