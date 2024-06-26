// SearchBar.tsx

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div id="search-bar-div">
      <p>Search powered by <a href="https://nuthatch.lastelm.software/" target="_blank">Nuthatch API</a></p>
      <div id="search-bar">
        <input
          id="search-input"
          type="text"
          placeholder="Search by common name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;