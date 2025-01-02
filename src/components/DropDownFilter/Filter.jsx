import React, { useState } from 'react'


//import css
import "./Filter.css"
//import  icons
import { FaArrowAltCircleUp } from "react-icons/fa";


const Filter = ({ showDropdown, selectRegion, handleOpenDropDown }) => {
    return (
        <section className="dropdown-content">
            <button className='btn-Filter' onClick={handleOpenDropDown}>
                Filter By Region<FaArrowAltCircleUp className='iconArrow' />
            </button>
            {showDropdown && (
                <div className='dropDown-menu' onClick={selectRegion} >
                    <option value="all" className="region">All</option>
                    <option value="africa" className="region">Africa</option>
                    <option value="americas" className="region">America</option>
                    <option value="asia" className="region">Asia</option>
                    <option value="europe" className="region">Europe</option>
                    <option value="oceania" className="region"> Oceania</option>
                    <option value="antarctic" className="region"> Antarctic</option>
                </div>
            )}
        </section>
    )
}

export default Filter