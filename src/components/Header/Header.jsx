import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiGlobe, FiShuffle } from 'react-icons/fi'

//import css
import "./Header.css"
import Switcher from '../Switcher/Switcher'
import useCountries from '../../hooks/useCountries'
import { countryPath } from '../../utils/countries'

const Header = () => {
    const navigate = useNavigate();
    const { countries } = useCountries();

    const openRandomCountry = () => {
        const country = countries[Math.floor(Math.random() * countries.length)];
        navigate(countryPath(country));
    };

    return (
        <header className='headerContent'>
            <div className='container headerInner'>
                <Link to="/" className='logo'>
                    <span className='logo-icon'><FiGlobe /></span>
                    <span className='logo-text'>Where in the world?</span>
                </Link>
                <div className='headerActions'>
                    <button
                        className='btn btn-surprise'
                        onClick={openRandomCountry}
                        disabled={countries.length === 0}
                        title="Open a random country"
                    >
                        <FiShuffle />
                        <span className='btn-surprise-label'>Surprise me</span>
                    </button>
                    <Switcher />
                </div>
            </div>
        </header>
    )
}

export default Header
