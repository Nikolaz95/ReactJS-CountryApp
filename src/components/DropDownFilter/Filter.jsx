import React, { useCallback, useRef, useState } from 'react'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

//import css
import "./Filter.css"
import { REGIONS } from '../../utils/countries'
import useClickOutside from '../../hooks/useClickOutside'

const Filter = ({ selectedRegion, onSelectRegion, counts }) => {
    const [open, setOpen] = useState(false);
    const filterRef = useRef(null);
    const close = useCallback(() => setOpen(false), []);
    useClickOutside(filterRef, close, open);

    const options = [
        { value: 'all', label: 'All regions', count: counts.all },
        ...REGIONS.map(region => ({ value: region, label: region, count: counts[region] ?? 0 })),
    ];
    const selected = options.find(option => option.value === selectedRegion) ?? options[0];

    const selectRegion = (value) => {
        onSelectRegion(value);
        setOpen(false);
    };

    return (
        <div className="dropdown-content" ref={filterRef}>
            <button
                type="button"
                className="btn-Filter"
                onClick={() => setOpen(!open)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="region-dot" data-region={selected.value} aria-hidden="true" />
                <span className="btn-Filter-label">
                    {selectedRegion === 'all' ? 'Filter by region' : selected.label}
                </span>
                <FiChevronDown className="iconArrow" />
            </button>

            {open && (
                <ul className="dropDown-menu" role="listbox" aria-label="Filter by region">
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={option.value === selectedRegion}
                            style={{ '--i': index }}
                        >
                            <button type="button" className="region-option" onClick={() => selectRegion(option.value)}>
                                <span className="region-dot" data-region={option.value} aria-hidden="true" />
                                <span className="region-option-label">{option.label}</span>
                                <span className="region-count">{option.count}</span>
                                <FiCheck className="region-check" aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Filter
