import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
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
      const apiUrl = `https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=100&region=North%20America&operator=AND&name=${query}`;
      const res = await fetch(apiUrl, {
        headers: {
          'api-key': import.meta.env.VITE_NUTHATCH_API_KEY,
        },
      });
      console.log(import.meta.env.VITE_NUTHATCH_API_KEY)
      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await res.json();
      setSearchResults(data["entities"]);
    } catch (error) {
      console.error('Error fetching search results: ', error);
    }
  };

  console.log("search results: ", searchResults);

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div>
        {searchResults.map((bird) => (
          <div key={bird.id}>
            <p>Name: {bird.name}</p>
            <p>Scientific Name: {bird.sciName}</p>
            {bird.images && bird.images.length > 0 && <img src={bird.images[0]} alt={bird.name} />}
          </div>
        ))}
      </div>
    </div>
  );
}