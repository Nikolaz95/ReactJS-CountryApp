import { useEffect, useState } from 'react';

const useFilter = (countries, selectedType) => {
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        if (selectedType === "all") {
            setFilteredResults(countries); // Show all countries if "all" is selected
        } else {
            const filtered = countries.filter(country => country.region.toLowerCase() === selectedType);
            setFilteredResults(filtered); // Set filtered countries based on the region
        }
    }, [selectedType, countries]);

    return filteredResults; // Return the filtered results
};

export default useFilter;