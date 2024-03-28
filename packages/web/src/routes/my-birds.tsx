import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/my-birds')({
  component: AddBird,
})

type Bird = {
  id: number;
  species: string;
  location: string;
  date: string;
};

function AddBird() {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    async function getBirds() {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/birds");
      const data = await res.json();
      setBirds(data.birds);
    }
    getBirds();
  }, []);

  return       <div className="card">
    <h2>Birds Found</h2>
  {birds.map((bird) => (
    <div key={bird.id}>
      <h3>{bird.species}</h3>
      <p>
        Seen in {bird.location} on {bird.date}
      </p>
    </div>
  ))}
</div>
}