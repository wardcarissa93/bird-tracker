import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { format, addDays } from 'date-fns';

export const Route = createFileRoute('/_authenticated/my-birds')({
  component: AddBird,
})

type Bird = {
  id: number;
  species: string;
  location: string;
  date: string;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  // formatted date will be off by 1 day unless a date is added prior to formatting
  const adjustedDate = addDays(date, 1);
  return format(adjustedDate, "MMM. do yyyy");
}

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

  return       <div id="birds-found-component">
    <h2>Birds Found</h2>
    <div id="birds-found-div">
      {birds.map((bird) => (
      <div key={bird.id} className="bird-found">
        <div className="image-div">
          <p>Image goes here</p>
        </div>
        <div className="species-div">
          <p>Species:</p>
          <p className="species-name">{bird.species}</p>
        </div>
        <div className="location-div">
          <p>Location seen:</p>
          <p>{bird.location}</p>
        </div>
        <div className="date-div">
          <p>Date:</p>
          <p>{formatDate(bird.date)}</p>
        </div>
      </div>
    ))}
  </div>
</div>
}