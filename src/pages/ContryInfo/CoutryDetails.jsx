import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack"
import titleName from '../../hooks/useTitle';


//import slike
import Flag from "../../assets/bih.png";
import { AiOutlineArrowLeft } from "react-icons/ai";

//import css
import "./CoutryDetails.css"
import Loader from '../../components/Loading/Loader';

const CoutryDetails = () => {
    const goBack = useMoveBack();
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const { name } = useParams();
    titleName(`Countries | ${name}`);

    useEffect(() => {
        const getSingleCountry = async () => {
            try {

                const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
                const data = await res.json();
                setCountry(data);
                console.log(data);
                // Ensure the loading spinner shows for at least 2 seconds
                setTimeout(() => {
                    setLoading(false); // Stop loading after 2 seconds
                }, 500);
            } catch (error) {
                console.error(error);
            }
        };

        getSingleCountry();
    }, [name]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="headerCntrDetails">
                <button onClick={goBack} className="btn-back arrow-back">
                    <AiOutlineArrowLeft /> Back
                </button>
            </div>

            <section className='cntDetails-section'>
                {country?.map((country) => (
                    <div className="cntDetails-left" key={country.population}>
                        <img src={country.flags?.png} alt="" className="country-flag" />
                        <div className="cntry-border">
                            <h1>Country Border with:</h1>
                            <div className="cntry-borderContent">
                                {country?.borders?.length > 0 ? (
                                    country.borders.map((borderCountryCode, index) => (
                                        <p >
                                            <span>{borderCountryCode}</span>
                                        </p>
                                    ))
                                ) : (
                                    <p>No bordering countries</p>
                                )}
                            </div>
                        </div>

                        <div className="country-location">
                            <h1>Country Location:</h1>
                            <div className="counrty-gogearth">
                                <NavLink to={country.maps?.googleMaps} target="_blank" rel="noopener noreferrer">
                                    <img src={country.flags?.svg} alt={`${country.name.common} on Google Maps`} className="img-location" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}

                {country?.map((countri) => (
                    <div className="cntDetails-right" key={countri.population2}>
                        <div className="content-insideRigth">
                            <div className="info-right">
                                <h1>Native name:</h1>
                                <strong>{countri?.name.common}</strong>
                                <h1>Population:</h1>
                                <strong>{countri?.population.toLocaleString()}</strong>
                                <h1>Area:</h1>
                                <strong>{countri?.area.toLocaleString()}</strong>
                                <h1>Region:</h1>
                                <strong>{countri?.region}</strong>
                                <h1>Sub Region:</h1>
                                <strong>{countri?.subregion}</strong>
                                <h1>Capital:</h1>
                                <strong>{countri?.capital[0]}</strong>
                            </div>


                            <div className="info-left">
                                <h1>Top Level Domain:</h1>
                                <strong>{countri?.tld[0]}</strong>
                                <h1>Currencies:</h1>
                                <strong>
                                    {countri?.currencies ? (
                                        Object.keys(countri.currencies).map((currencyCode) => (
                                            <span key={currencyCode}>
                                                {countri.currencies[currencyCode].name} ({countri.currencies[currencyCode].symbol})
                                            </span>
                                        ))
                                    ) : "N/A"}
                                </strong>
                                <h1>Languages:</h1>
                                <strong>{countri?.languages ? Object.values(countri.languages).join(", ") : "N/A"}</strong>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default CoutryDetails