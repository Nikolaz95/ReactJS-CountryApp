import React from 'react'
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

//import css
import "./MainContent.css"
import { countryPath, formatNumber } from '../../utils/countries';

const SKELETON_CARDS = 12;

const CountryCard = ({ country, index }) => (
    <Link to={countryPath(country)} className="card" style={{ '--i': index }}>
        <div className="cardFlag">
            <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                loading="lazy"
                className="cardImg"
            />
        </div>
        <div className="cardBody">
            <div className="cardHeading">
                <h2 className="cardTitle">{country.name.common}</h2>
                <span className="region-badge" data-region={country.region}>{country.region}</span>
            </div>
            <dl className="cardFacts">
                <div>
                    <dt>Population</dt>
                    <dd>{country.population ? formatNumber(country.population) : "Uninhabited"}</dd>
                </div>
                <div>
                    <dt>Capital</dt>
                    <dd>{country.capital[0] ?? "—"}</dd>
                </div>
            </dl>
        </div>
    </Link>
);

const SkeletonCard = () => (
    <div className="card card-skeleton" aria-hidden="true">
        <div className="cardFlag skeleton" />
        <div className="cardBody">
            <div className="skeleton" style={{ height: 22, width: '70%' }} />
            <div className="skeleton" style={{ height: 14, width: '50%' }} />
            <div className="skeleton" style={{ height: 14, width: '40%' }} />
        </div>
    </div>
);

const MainContent = ({ countries, loading, error, animationKey, onReset }) => {
    if (error) {
        return <p className="results-message">{error}</p>;
    }

    if (loading) {
        return (
            <section className="cardContent" aria-busy="true">
                {Array.from({ length: SKELETON_CARDS }, (_, i) => <SkeletonCard key={i} />)}
            </section>
        );
    }

    if (countries.length === 0) {
        return (
            <div className="empty-state">
                <FiSearch className="empty-icon" />
                <h2>No countries found</h2>
                <p>Try a different name, or search in all regions.</p>
                <button className="btn btn-primary" onClick={onReset}>Clear filters</button>
            </div>
        );
    }

    return (
        <section className="cardContent" key={animationKey}>
            {countries.map((country, index) => (
                <CountryCard key={country.cca3} country={country} index={index} />
            ))}
        </section>
    )
}

export default MainContent
