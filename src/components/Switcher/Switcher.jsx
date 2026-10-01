import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

//import css
import "./Switcher.css"

// index.html already set data-theme: light unless the visitor chose dark before
const getInitialTheme = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

const Switcher = () => {
    const [theme, setTheme] = useState(getInitialTheme);
    const isDark = theme === 'dark';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const next = isDark ? 'light' : 'dark';
        setTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch {
            // Storage can be blocked, the theme still works for this visit
        }
    };

    return (
        <button
            className='icon-btn theme-toggle'
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
        >
            <span className='theme-toggle-icon' key={theme}>
                {isDark ? <FiSun /> : <FiMoon />}
            </span>
        </button>
    )
}

export default Switcher
