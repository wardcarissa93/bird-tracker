import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"; // Import the token handling library

export const Route = createFileRoute('/_authenticated/my-birds')({
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
  const { getToken } = useKindeAuth(); // Access the getToken function

  useEffect(() => {
    async function getBirds() {
      try {
        const token = await getToken(); // Get the token
        if (!token) {
          throw new Error("No token found");
        }
        
        const res = await fetch(import.meta.env.VITE_APP_API_URL + "/birds", {
          headers: {
            Authorization: token, // Send the token in the Authorization header
          },
        });
        
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        setBirds(data.birds);
      } catch (error) {
        console.error(error);
        // Handle errors here, such as setting an error state or displaying a message
      }
    }
    getBirds();
  }, [getToken]); // Include getToken in the dependencies array to ensure it's fetched when needed

  return (
    <div className="card">
      <h2>Birds Found</h2>
      {birds.map((bird) => (
        <div key={bird.id}>
          <h3>{bird.species}</h3>
          <p>
            Seen {bird.location} on {bird.date}
          </p>
        </div>
      ))}
    </div>
  );
}
