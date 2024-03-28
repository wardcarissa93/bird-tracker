import { useState, useEffect } from 'react';
import './App.css';

type Bird = {
  id: number;
  species: string;
  location: string;
  date: string;
};

function App() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function getBirds() {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/birds");
      const data = await res.json();
      setBirds(data.birds);
    }
    getBirds();
  }, []);

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
    const data = await res.json();
    setBirds(data.birds);
    setSpecies("");
    setLocation("");
    setDate("");
  };

  return (
    <div className="App">
      <div className="card">
        <h2>My Birds</h2>
        <form onSubmit={handleSubmit}>
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
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <button type="submit">Add Bird</button>
        </form>
        {birds.map((bird) => (
          <div key={bird.id}>
            <h3>{bird.species}</h3>
            <p>
              Seen in {bird.location} on {bird.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
