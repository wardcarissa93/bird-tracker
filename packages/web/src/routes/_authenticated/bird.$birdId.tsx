import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'

type BirdDetail = {
  name: string,
  sciName: string,
  lengthMin: string,
  lengthMax: string,
  family: string,
  order: string,
  status: string,
  images: string[],
}

export const Route = createFileRoute('/_authenticated/bird/$birdId')({
  component: BirdDetailPage,
})

function BirdDetailPage() {
  const [bird, setBird] = useState<BirdDetail>();

  const { birdId } = Route.useParams();
  console.log(birdId);

  useEffect(() => {
    const fetchIndividualBird = async (id: string) => {
      try {
        const apiUrl = `https://nuthatch.lastelm.software/birds/${id}`;
        const res = await fetch(apiUrl, {
          headers: {
            'api-key': import.meta.env.VITE_NUTHATCH_API_KEY,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch bird details');
        }
        const data = await res.json();
        setBird(data);
      } catch (error) {
        console.error('Error fetching search results: ', error);
      }
    };
    fetchIndividualBird(birdId);
  }, [birdId, setBird]);

  console.log(bird);

  return (
    <div id="bird-detail-component">
      <h2 className="species-name">{bird?.sciName}</h2>
      <div id="bird-detail-data">
        <div id="bird-detail-name">
          <p>Common Name:</p>
          <p>{bird?.name}</p>
        </div>
        <div id="bird-detail-order">
          <p>Order:</p>
          <p>{bird?.order}</p>
        </div>
        <div id="bird-detail-family">
          <p>Family:</p>
          <p>{bird?.family}</p>
        </div>
        <div id="bird-detail-wingspan">
          <p>Wingspan:</p>
          <p>{bird?.lengthMin} - {bird?.lengthMax} cm</p>
        </div>
        <div id="bird-detail-status">
          <p>Conservation Status:</p>
          <p>{bird?.status}</p>
        </div>
      </div>
      {(bird?.images && bird?.images.length > 0 ) && (
        <div id="bird-detail-image-div">
          <h4>Image Gallery</h4>
          <div id="bird-detail-images">
            {bird.images.map((image, index) => (
              <div className="bird-detail-image">
                <img key={index} src={image} alt={`Image ${index}`}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}