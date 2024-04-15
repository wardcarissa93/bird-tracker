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
  imageUrl?: string;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  // formatted date will be off by 1 day unless a date is added prior to formatting
  const adjustedDate = addDays(date, 1);
  return format(adjustedDate, "MMM. do yyyy");
}

function MyBirds() {
  const { getToken } = useKindeAuth();

  async function getBirds() {
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
    queryKey: ["getBirds"],
    queryFn: getBirds,
  });

  return       <div id="birds-found-component">
    <h2>Birds Found</h2>
    <div id="birds-found-div">
      {data?.birds.map((bird) => (
      <div key={bird.id} className="bird-found">
        {(bird.imageUrl) ? (
          <div className="image-div">
            <img src={bird.imageUrl} alt={"Image of " + bird.species} />
          </div>
        ) : (
          <div className="no-image-div">
            <p>No Image Available</p>
          </div>
        )}
        <div className="species-div">
          <p>Species:</p>
          <p className="species-name">{bird.species}</p>
        </div>
        <div className="location-div">
          <p>Location:</p>
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