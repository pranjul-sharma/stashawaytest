import React from 'react'
import { SEARCH_PLACEHOLDER } from '../shared/constants';
import '../styles/search-bar.scss';
export default function SearchBar({ onInput, searchStr, onSearchClicked }) {
  return (
    <div id="search-bar-container" className="flex-center">
      <div id="search-bar" className="flex-space">
        <input value={searchStr} onChange={onInput} placeholder={SEARCH_PLACEHOLDER}/>
        <button onClick={onSearchClicked}>Search</button>
      </div>
    </div>
  );
}
