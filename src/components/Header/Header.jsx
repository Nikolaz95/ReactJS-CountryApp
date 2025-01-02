import React from 'react'

//import css
import "./Header.css"
import Switcher from '../Switcher/Switcher'

const Header = () => {
    return (
        <header className='headerContent'>
            <div className='titleHeader'>
                <h1>Where in the world ?</h1>
            </div>
            {/* <div className="switcher">
                <Switcher />
            </div> */}
        </header>
    )
}

export default Header