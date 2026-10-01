import { useEffect, useState } from 'react';

// Country data is loaded once and shared by every page
let cache = null;
let request = null;

const loadCountries = () => {
    request ??= fetch('/countries.json')
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load countries (${response.status})`);
            return response.json();
        })
        .then(data => (cache = data))
        .catch(error => {
            request = null;
            throw error;
        });
    return request;
};

const useCountries = () => {
    const [countries, setCountries] = useState(cache ?? []);
    const [loading, setLoading] = useState(!cache);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cache) return;
        let active = true;

        loadCountries()
            .then(data => active && setCountries(data))
            .catch(() => active && setError('Could not load countries. Please try again.'))
            .finally(() => active && setLoading(false));

        return () => {
            active = false;
        };
    }, []);

    return { countries, loading, error };
};

export default useCountries;
