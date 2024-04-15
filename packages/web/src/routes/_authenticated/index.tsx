import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import SearchBar from '../../components/search-bar';
import '../../App.css';

interface Bird {
  id: number;
  name: string;
  sciName: string;
  images: string[];
}

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
})

function HomePage() {
  const [searchResults, setSearchResults] = useState<Bird[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const searchResultsFor = document.getElementById('search-results-for');
      if (searchResultsFor) {
        searchResultsFor.textContent = "Loading search results...";
      }

      const apiUrl = `https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=100&region=North%20America&operator=AND&name=${query}`;
      const res = await fetch(apiUrl, {
        headers: {
          'api-key': import.meta.env.VITE_NUTHATCH_API_KEY,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await res.json();
      console.log(data);

      if (data["entities"].length === 0) {
        if (searchResultsFor) {
          searchResultsFor.textContent = `No search results matching '${query}'. `;
        }
      } else {
        if (searchResultsFor) {
          searchResultsFor.textContent = `Search results for '${query}': `;
        }
      }
      setSearchResults(data["entities"]);
    } catch (error) {
      console.error('Error fetching search results: ', error);
    }
  };

  return (
    <div className="App">
      <div id="search-title">
        <h2>Search for North American Birds</h2>
        <h2>by Common Name</h2>
      </div>
      <SearchBar onSearch={handleSearch} />
      <p id="search-results-for"></p>
      <div id="bird-results-div">
        {searchResults.map((bird) => (
          <div key={bird.id} className="bird-result">
            {(bird.images && bird.images.length > 0) ? (
              <img src={bird.images[0]} alt={bird.name} className="bird-result-image"/>
            ) : (
              <div className="bird-result-no-image">
                <p>No Image Available</p>
              </div>
            )}
            <div className="bird-result-name">
              <p>{bird.name}</p>
              <p className="species-name">{bird.sciName}</p>
            </div>
            <Link to="/bird/$birdId" params={{ birdId: bird.id.toLocaleString() }}>
              <button className="more-info-button">More Info</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}