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
  

  return <>        
  <h2>Record a Bird Sighting</h2>
    <form onSubmit={handleSubmit} id="bird-form">
      <label>
        Species:
        <input
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button type="submit" id="add-bird-button">Add Bird</button>
    </form>
  </>
}