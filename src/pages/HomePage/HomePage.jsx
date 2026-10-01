import React, { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import useTitle from '../../hooks/useTitle';
import useCountries from '../../hooks/useCountries';

//import css
import "./HomePage.css"

//import components
import Search from '../../components/SearchInput/Search';
import Filter from '../../components/DropDownFilter/Filter';
import MainContent from '../../components/MainContent/MainContent';
import Pagination from '../../components/Pagination/Paginationn';
import { REGIONS, SORT_OPTIONS, formatCompact, formatNumber, matchesQuery } from '../../utils/countries';

const COUNTRIES_PER_PAGE = 24;
const DEFAULTS = { q: '', region: 'all', sort: 'name', page: '1' };

const HomePage = () => {
    useTitle('Where in the world? | Countries');
    const { countries, loading, error } = useCountries();
    const resultsRef = useRef(null);

    // Search, filter, sort and page live in the URL, so they survive going to a country and back
    const [params, setParams] = useSearchParams();
    const searchValue = params.get('q') ?? DEFAULTS.q;
    const region = REGIONS.includes(params.get('region')) ? params.get('region') : DEFAULTS.region;
    const sortOption = SORT_OPTIONS.find(option => option.value === params.get('sort')) ?? SORT_OPTIONS[0];
    const requestedPage = Math.max(1, Number(params.get('page')) || 1);

    const updateParams = (changes, options) => {
        const next = new URLSearchParams(params);
        Object.entries(changes).forEach(([key, value]) => {
            if (value && value !== DEFAULTS[key]) next.set(key, value);
            else next.delete(key);
        });
        setParams(next, options);
    };

    const searched = useMemo(
        () => countries.filter(country => matchesQuery(country, searchValue)),
        [countries, searchValue]
    );

    const regionCounts = useMemo(() => {
        const counts = { all: searched.length };
        searched.forEach(country => {
            counts[country.region] = (counts[country.region] ?? 0) + 1;
        });
        return counts;
    }, [searched]);

    const results = useMemo(() => {
        const inRegion = region === 'all' ? searched : searched.filter(country => country.region === region);
        return [...inRegion].sort(sortOption.compare);
    }, [searched, region, sortOption]);

    const worldPopulation = useMemo(() => countries.reduce((sum, country) => sum + country.population, 0), [countries]);

    const pageCount = Math.max(1, Math.ceil(results.length / COUNTRIES_PER_PAGE));
    const currentPage = Math.min(requestedPage, pageCount);
    const firstIndex = (currentPage - 1) * COUNTRIES_PER_PAGE;
    const currentCountries = results.slice(firstIndex, firstIndex + COUNTRIES_PER_PAGE);

    const handlePageChange = (page) => {
        updateParams({ page: String(page) });
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const resetFilters = () => setParams(new URLSearchParams());

    return (
        <div className='homeContent container'>
            <section className="hero">
                <p className="hero-eyebrow animate-fade-up">World atlas</p>
                <h1 className="hero-title animate-fade-up" style={{ '--delay': 1 }}>
                    Explore every country <span>on Earth</span>
                </h1>
                <p className="hero-text animate-fade-up" style={{ '--delay': 2 }}>
                    Search, filter by region and dive into population, languages, currencies and neighbours.
                </p>
                <dl className="hero-stats animate-fade-up" style={{ '--delay': 3 }}>
                    <div>
                        <dt>Countries</dt>
                        <dd>{loading ? '—' : countries.length}</dd>
                    </div>
                    <div>
                        <dt>People</dt>
                        <dd>{loading ? '—' : formatCompact(worldPopulation)}</dd>
                    </div>
                    <div>
                        <dt>Regions</dt>
                        <dd>{REGIONS.length}</dd>
                    </div>
                </dl>
            </section>

            <section className="topContent animate-fade-up" style={{ '--delay': 4 }} ref={resultsRef}>
                <Search
                    searchValue={searchValue}
                    setSearchValue={(value) => updateParams({ q: value, page: DEFAULTS.page }, { replace: true })}
                />
                <div className="toolbar-controls">
                    <Filter
                        selectedRegion={region}
                        onSelectRegion={(value) => updateParams({ region: value, page: DEFAULTS.page })}
                        counts={regionCounts}
                    />
                    <div className="sort-select">
                        <label htmlFor="sort" className="visually-hidden">Sort countries</label>
                        <select
                            id="sort"
                            value={sortOption.value}
                            onChange={(e) => updateParams({ sort: e.target.value, page: DEFAULTS.page })}
                        >
                            {SORT_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <FiChevronDown className="sort-icon" aria-hidden="true" />
                    </div>
                </div>
            </section>

            {!loading && !error && results.length > 0 && (
                <p className='numberOfCntr' aria-live="polite">
                    Showing <strong>{formatNumber(firstIndex + 1)}–{formatNumber(firstIndex + currentCountries.length)}</strong> of{' '}
                    <strong>{results.length}</strong> countries
                    {region !== 'all' && <> in <span className="region-badge" data-region={region}>{region}</span></>}
                </p>
            )}

            <MainContent
                countries={currentCountries}
                loading={loading}
                error={error}
                animationKey={`${region}-${sortOption.value}-${currentPage}`}
                onReset={resetFilters}
            />

            {!loading && (
                <Pagination page={currentPage} pageCount={pageCount} onChange={handlePageChange} />
            )}
        </div>
    )
}

export default HomePage
