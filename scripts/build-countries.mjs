// Generates public/countries.json in the same shape the old restcountries v3.1 API returned.
// restcountries v3.1 was shut down (it now redirects without CORS headers), so the app reads this static file instead.
// Run with: npm run build:data
import { writeFile } from 'node:fs/promises';

const COUNTRIES_URL = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';
const WORLD_BANK_URL = 'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=20000&mrnev=1';
const WIKIDATA_URL = 'https://query.wikidata.org/sparql';
const WIKIDATA_QUERY = 'SELECT ?iso (MAX(?pop) AS ?p) WHERE { ?c wdt:P298 ?iso; wdt:P1082 ?pop. } GROUP BY ?iso';

// World Bank uses a different code than ISO for some countries
const WORLD_BANK_CODES = { UNK: 'XKX' };

const getJson = async (url, options) => {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
};

const [countries, [, worldBankRows], wikidata] = await Promise.all([
    getJson(COUNTRIES_URL),
    getJson(WORLD_BANK_URL),
    getJson(`${WIKIDATA_URL}?query=${encodeURIComponent(WIKIDATA_QUERY)}`, {
        headers: { Accept: 'application/sparql-results+json', 'User-Agent': 'CountryAppDataBuild/1.0' },
    }),
]);

// World Bank is the main population source, Wikidata fills in territories it does not cover
const worldBankPopulation = Object.fromEntries(
    worldBankRows.filter(row => row.value != null).map(row => [row.countryiso3code, row.value])
);
const wikidataPopulation = Object.fromEntries(
    wikidata.results.bindings.map(row => [row.iso.value, Number(row.p.value)])
);

const result = countries.map(country => {
    const code = country.cca2.toLowerCase();
    const [lat, lng] = country.latlng;
    return {
        name: { common: country.name.common, official: country.name.official },
        cca3: country.cca3,
        flags: {
            png: `https://flagcdn.com/w320/${code}.png`,
            svg: `https://flagcdn.com/${code}.svg`,
        },
        population: worldBankPopulation[WORLD_BANK_CODES[country.cca3] ?? country.cca3]
            ?? wikidataPopulation[country.cca3]
            ?? 0,
        area: country.area,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital ?? [],
        tld: country.tld ?? [],
        currencies: country.currencies ?? {},
        languages: country.languages ?? {},
        borders: country.borders ?? [],
        latlng: country.latlng,
        landlocked: country.landlocked,
        independent: country.independent,
        unMember: country.unMember,
        demonym: country.demonyms?.eng?.m ?? '',
        callingCode: country.idd?.suffixes?.length === 1 ? country.idd.root + country.idd.suffixes[0] : country.idd?.root ?? '',
        maps: { googleMaps: `https://www.google.com/maps/@${lat},${lng},6z` },
    };
});

await writeFile(new URL('../public/countries.json', import.meta.url), JSON.stringify(result));
console.log(`Wrote ${result.length} countries to public/countries.json`);
