import React, { useMemo } from 'react'
import { Link, useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack"
import useTitle from '../../hooks/useTitle';
import useCountries from '../../hooks/useCountries';
import useCountUp from '../../hooks/useCountUp';

//import icons
import { FiArrowLeft, FiExternalLink, FiMapPin, FiMaximize, FiUsers, FiGrid } from "react-icons/fi";

//import css
import "./CoutryDetails.css"
import Loader from '../../components/Loading/Loader';
import { countryPath, formatNumber } from '../../utils/countries';

// OpenStreetMap embed around the country, zoomed roughly to its size
const getMapUrl = ([lat, lng], area) => {
    const span = Math.min(40, Math.max(1.5, (Math.sqrt(area) / 111) * 1.2));
    const clampLat = (value) => Math.max(-85, Math.min(85, value));
    const bbox = [lng - span * 1.6, clampLat(lat - span), lng + span * 1.6, clampLat(lat + span)].join(',');
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
};

const getRank = (countries, country, key) => {
    const ranked = countries.filter(c => c[key] > 0).sort((a, b) => b[key] - a[key]);
    const index = ranked.findIndex(c => c.cca3 === country.cca3);
    return index === -1 ? null : { rank: index + 1, total: ranked.length };
};

const StatCard = ({ icon, label, value, suffix, detail, delay, children }) => {
    const animated = useCountUp(value);
    return (
        <div className="stat-card animate-fade-up" style={{ '--delay': delay }}>
            <span className="stat-icon">{icon}</span>
            <p className="stat-label">{label}</p>
            <p className="stat-value">
                {formatNumber(animated)}
                {suffix && <span className="stat-suffix"> {suffix}</span>}
            </p>
            {detail && <p className="stat-detail">{detail}</p>}
            {children}
        </div>
    );
};

const rankText = (rank, label) => rank ? `#${rank.rank} of ${rank.total} by ${label}` : null;

const CountryView = ({ country, countries }) => {
    const goBack = useMoveBack();

    const { populationRank, areaRank, worldShare, neighbours } = useMemo(() => {
        const worldPopulation = countries.reduce((sum, c) => sum + c.population, 0);
        return {
            populationRank: getRank(countries, country, 'population'),
            areaRank: getRank(countries, country, 'area'),
            worldShare: worldPopulation ? (country.population / worldPopulation) * 100 : 0,
            neighbours: country.borders
                .map(code => countries.find(c => c.cca3 === code))
                .filter(Boolean),
        };
    }, [countries, country]);

    const density = country.area > 0 ? Math.round(country.population / country.area) : 0;
    const currencies = Object.values(country.currencies)
        .map(currency => currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name)
        .join(', ');

    const facts = [
        { label: 'Official name', value: country.name.official },
        { label: 'Capital', value: country.capital.join(', ') },
        { label: 'Region', value: country.region },
        { label: 'Sub region', value: country.subregion },
        { label: 'Languages', value: Object.values(country.languages).join(', ') },
        { label: 'Currencies', value: currencies },
        { label: 'Demonym', value: country.demonym },
        { label: 'Calling code', value: country.callingCode },
        { label: 'Top level domain', value: country.tld.join(', ') },
        { label: 'Landlocked', value: country.landlocked ? 'Yes' : 'No' },
        { label: 'UN member', value: country.unMember ? 'Yes' : 'No' },
        { label: 'Independent', value: country.independent ? 'Yes' : 'No' },
    ];

    return (
        <div className="container country-page">
            <button onClick={goBack} className="btn btn-back">
                <FiArrowLeft /> Back
            </button>

            <section className="country-hero">
                <div className="country-flag-frame animate-fade-up">
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="country-flag" />
                </div>
                <div className="country-intro">
                    <div className="country-tags animate-fade-up" style={{ '--delay': 1 }}>
                        <span className="region-badge" data-region={country.region}>{country.region}</span>
                        {country.subregion && <span className="country-subregion">{country.subregion}</span>}
                    </div>
                    <h1 className="country-name animate-fade-up" style={{ '--delay': 2 }}>{country.name.common}</h1>
                    {country.name.official !== country.name.common && (
                        <p className="country-official animate-fade-up" style={{ '--delay': 3 }}>{country.name.official}</p>
                    )}
                    {country.capital.length > 0 && (
                        <p className="country-capital animate-fade-up" style={{ '--delay': 4 }}>
                            <FiMapPin /> Capital: <strong>{country.capital.join(', ')}</strong>
                        </p>
                    )}
                </div>
            </section>

            <section className="stat-grid" aria-label="Key numbers">
                <StatCard
                    icon={<FiUsers />}
                    label="Population"
                    value={country.population}
                    detail={rankText(populationRank, 'population')}
                    delay={2}
                >
                    <div className="share">
                        <div className="share-bar">
                            <span style={{ '--share': `${Math.max(worldShare, 0.5)}%` }} />
                        </div>
                        <p className="stat-detail">
                            {worldShare < 0.01 ? '< 0.01' : worldShare.toFixed(2)}% of world population
                        </p>
                    </div>
                </StatCard>
                <StatCard
                    icon={<FiMaximize />}
                    label="Area"
                    value={Math.round(country.area)}
                    suffix="km²"
                    detail={rankText(areaRank, 'area')}
                    delay={3}
                />
                <StatCard
                    icon={<FiGrid />}
                    label="Density"
                    value={density}
                    suffix="people / km²"
                    detail={density > 0 ? (density > 150 ? 'Densely populated' : density > 30 ? 'Moderately populated' : 'Sparsely populated') : null}
                    delay={4}
                />
            </section>

            <div className="country-columns">
                <section className="panel facts-panel animate-fade-up" style={{ '--delay': 3 }}>
                    <h2 className="panel-title">Facts</h2>
                    <dl className="facts-list">
                        {facts.map(fact => (
                            <div key={fact.label} className="fact">
                                <dt>{fact.label}</dt>
                                <dd>{fact.value || '—'}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="panel map-panel animate-fade-up" style={{ '--delay': 4 }}>
                    <div className="panel-heading">
                        <h2 className="panel-title">On the map</h2>
                        <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="panel-link">
                            Google Maps <FiExternalLink />
                        </a>
                    </div>
                    <div className="map-frame">
                        <iframe
                            title={`Map of ${country.name.common}`}
                            src={getMapUrl(country.latlng, country.area)}
                            loading="lazy"
                        />
                    </div>
                </section>
            </div>

            <section className="panel neighbours-panel animate-fade-up" style={{ '--delay': 5 }}>
                <h2 className="panel-title">
                    Neighbours <span className="panel-count">{neighbours.length}</span>
                </h2>
                {neighbours.length > 0 ? (
                    <div className="neighbours-grid">
                        {neighbours.map((neighbour, index) => (
                            <Link
                                key={neighbour.cca3}
                                to={countryPath(neighbour)}
                                className="neighbour"
                                style={{ '--i': index }}
                            >
                                <img src={neighbour.flags.png} alt="" loading="lazy" />
                                <span>{neighbour.name.common}</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="panel-empty">
                        {country.name.common} has no land borders with other countries.
                    </p>
                )}
            </section>
        </div>
    );
};

const CoutryDetails = () => {
    const { name } = useParams();
    const { countries, loading, error } = useCountries();

    const country = useMemo(() => {
        const key = name.toLowerCase();
        return countries.find(c => c.name.common.toLowerCase() === key || c.cca3.toLowerCase() === key);
    }, [countries, name]);

    useTitle(country ? `${country.name.common} | Where in the world?` : 'Where in the world?');

    if (loading) {
        return <Loader />;
    }

    if (error || !country) {
        return (
            <div className="container country-missing animate-fade-up">
                <h1>{error ? 'Something went wrong' : 'Country not found'}</h1>
                <p>{error ?? `We couldn't find a country called "${name}".`}</p>
                <Link to="/" className="btn btn-primary">Back to all countries</Link>
            </div>
        );
    }

    // key resets the count-up animations when moving to a neighbour
    return <CountryView key={country.cca3} country={country} countries={countries} />;
}

export default CoutryDetails
