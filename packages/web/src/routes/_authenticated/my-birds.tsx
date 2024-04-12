// import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { format, addDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

export const Route = createFileRoute('/_authenticated/my-birds')({
  component: MyBirds,
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

function MyBirds() {
  const { getToken } = useKindeAuth();
  // const [birds, setBirds] = useState<Bird[]>([]);

  // useEffect(() => {
  //   async function getBirds() {
  //     try {
  //       const token = await getToken();
  //       if (!token) {
  //         throw new Error("No token found.");
  //       }
  //       const res = await fetch(import.meta.env.VITE_APP_API_URL + "/birds", {
  //         headers: {
  //           Authorization: token, 
  //         },
  //       });
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch birds data.");
  //       }
  //       const data = await res.json();
  //       setBirds(data.birds);
  //     } catch (error) {
  //       console.error("Error fetching birds:", error);
  //       // Handle the error state or display a message to the user
  //     }
  //   }    
  //   getBirds();
  // }, [getToken]);

  async function getAllExpenses() {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/birds", {
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return (await res.json()) as { birds: Bird[] };
  }

  const { data } = useQuery({
    queryKey: ["getAllExpenses"],
    queryFn: getAllExpenses,
  });

  return       <div id="birds-found-component">
    <h2>Birds Found</h2>
    <div id="birds-found-div">
      {data?.birds.map((bird) => (
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