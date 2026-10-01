export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

export const SORT_OPTIONS = [
    { value: 'name', label: 'Name (A–Z)', compare: (a, b) => a.name.common.localeCompare(b.name.common) },
    { value: 'population-desc', label: 'Population (high → low)', compare: (a, b) => b.population - a.population },
    { value: 'population-asc', label: 'Population (low → high)', compare: (a, b) => a.population - b.population },
    { value: 'area-desc', label: 'Area (largest first)', compare: (a, b) => b.area - a.area },
];

const numberFormat = new Intl.NumberFormat('en-US');
const compactFormat = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

export const formatNumber = value => numberFormat.format(value);
export const formatCompact = value => compactFormat.format(value);

// Lowercase and strip accents so "aland" matches "Åland"
export const normalize = text => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const matchesQuery = (country, query) => {
    if (!query) return true;
    const q = normalize(query.trim());
    return [country.name.common, country.name.official, ...country.capital].some(text => normalize(text).includes(q));
};

export const countryPath = country => `/country/${encodeURIComponent(country.name.common)}`;
