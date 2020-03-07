import React from 'react';
import { KEY_ALL } from '../shared/constants';
import '../styles/filters.scss';
export default function Filters({
  onFilterByYear,
  allYears,
  selectedYear,
  selectedCountry,
  onFilterByCountry,
  allCountries
}) {
  return (
    <div id="filters-container" className="flex-center">
      <div className="flex-center">
        <div>Filter By Year:&nbsp;</div>
        <div>
          <select
            id="years"
            name="years"
            value={selectedYear}
            onChange={onFilterByYear}
          >
            {allYears.map(year => (
              <option key={year} value={year} selected={year.includes(KEY_ALL)}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-center">
        <div>Filter By Country:&nbsp;</div>
        <div>
          <select
            id="years"
            name="years"
            value={selectedCountry}
            onChange={onFilterByCountry}
          >
            {allCountries.map(country => (
              <option
                key={country}
                value={country}
                selected={country.includes(KEY_ALL)}
              >
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
