import React, { useEffect, useState } from 'react'
import titleName from '../../hooks/useTitle';
import useFetch from "../../hooks/useFetch";



//import css
import "./HomePage.css"


//import components
import Search from '../../components/SearchInput/Search';
import Filter from '../../components/DropDownFilter/Filter';
import MainContent from '../../components/MainContent/MainContent';
import useFilter from '../../hooks/useFilter';

const HomePage = () => {
    titleName('Countries of the World');

    const [searchValue, setSearchValue] = useState("");


    /* funckija za dropdown */
    const [showDropdown, setShowDropdown] = useState(false);
    /* select type */
    const [selectedType, setSelectedType] = useState("all");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 20;


    const apiData = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";
    const { data: countries, loading, error } = useFetch(apiData);

    // Use the custom useFilter hook
    const filteredResults = useFilter(countries, selectedType);

    // Filter countries based on search value
    const searchFilteredResults = filteredResults.filter(country =>
        country.name.common.toLowerCase().includes(searchValue) // Case-insensitive search
    );

    // Calculate the countries to display on the current page
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = searchFilteredResults.slice(indexOfFirstCountry, indexOfLastCountry);


    const handleOpenDropDown = () => {
        setShowDropdown(!showDropdown)
    }

    const selectRegion = (e) => {
        setSelectedType(e.target.value);
        setShowDropdown(false);
        setCurrentPage(1);
    };

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };


    return (
        <div className='homeContent'>
            <section className="topContent">
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <div className='numberOfCntr'>
                    <h1 >Category: {selectedType === "all" ? "All" : selectedType}</h1>
                    <p className='text-numberOfCntr'>Total Countries: {selectedType} {filteredResults.length}</p>
                </div>
                <Filter
                    showDropdown={showDropdown}
                    selectRegion={selectRegion}
                    handleOpenDropDown={handleOpenDropDown}
                />

            </section>
            <main className="mainContent">
                <MainContent
                    countries={currentCountries}  // Pass only the current page's countries
                    loading={loading}
                    error={error}
                    totalCountries={filteredResults.length}
                    countriesPerPage={countriesPerPage}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage} />
            </main>
        </div>
    )
}

export default HomePage