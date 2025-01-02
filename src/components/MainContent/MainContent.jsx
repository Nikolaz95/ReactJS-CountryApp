import React from 'react'
import { NavLink } from 'react-router-dom';


//import components
import Loader from '../Loading/Loader';

//import css
import "./MainContent.css"

//import img
import Pagination from '../Pagination/Paginationn';


const MainContent = ({ countries, loading, error, totalCountries, countriesPerPage, handlePageChange, currentPage }) => {

    return (
        <>
            {loading ? (
                <Loader /> // Display loader while loading
            ) : (
                <>
                    <section className="cardContent">

                        {countries?.map((country) => (
                            <div key={country.name.common} className="card"> {/* Use cca3 as a unique key */}
                                <div className="cardTop">
                                    <NavLink to={`/country/${country.name.common}`}>
                                        <img
                                            src={country.flags.png}
                                            alt={`${country.name.common} flag`}
                                            width={50}
                                            height={30}
                                            className="cardImg"
                                        />
                                    </NavLink>
                                </div>
                                <div className="cardBottom">
                                    <strong>{country.name.common}</strong>
                                    <p>Population: {country.population.toLocaleString()}</p>
                                    <p>Region: {country.region}</p>
                                    <p>Capital city: {country.capital ? country.capital[0] : "N/A"}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    <div className="pagination">
                        <Pagination
                            countriesPerPage={countriesPerPage}
                            totalCountries={totalCountries}
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </>
            )}
        </>


    )
}

export default MainContent