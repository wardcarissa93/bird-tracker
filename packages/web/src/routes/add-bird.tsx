import { useState} from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/add-bird')({
  component: MyBirds,
})

function MyBirds() {
  const navigate = useNavigate();
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBird = { species, location, date };
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/birds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bird: newBird }),
    });
    await res.json(); // Assuming you don't need to use the response data
    setSpecies("");
    setLocation("");
    setDate("");

    navigate({ to: '/my-birds' });
  };
  

  return <div id="add-bird-component">        
    <h2>Record a Bird Sighting</h2>
    <form onSubmit={handleSubmit} id="bird-form">
      <div id="species-input" className="input-div">
        <label htmlFor="species">Species:</label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
      </div>
      <div id="location-input" className="input-div">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div id="date-input" className="input-div">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" id="add-bird-button">Add Bird</button>
    </form>
  </div>
}