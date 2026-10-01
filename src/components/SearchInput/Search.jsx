import React, { useEffect, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

//import css
import "./Search.css"

const Search = ({ searchValue, setSearchValue }) => {
    const inputRef = useRef(null);

    // Press "/" anywhere on the page to jump to search
    useEffect(() => {
        const handleKey = (e) => {
            const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
            if (e.key === '/' && !typing) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const clearSearch = () => {
        setSearchValue("");
        inputRef.current?.focus();
    };

    return (
        <form className="search-content" role="search" onSubmit={(e) => e.preventDefault()}>
            <FiSearch className="search-icon" aria-hidden="true" />
            <label htmlFor="country-search" className="visually-hidden">Search for a country or capital</label>
            <input
                id="country-search"
                type="search"
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Escape' && setSearchValue("")}
                className="searchCountry"
                placeholder="Search a country or capital…"
                autoComplete="off"
            />
            {searchValue ? (
                <button type="button" className="search-clear" onClick={clearSearch} aria-label="Clear search">
                    <FiX />
                </button>
            ) : (
                <kbd className="search-kbd" aria-hidden="true">/</kbd>
            )}
        </form>
    )
}

export default Search
