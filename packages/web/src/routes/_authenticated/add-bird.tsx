import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

type FileState = File | null;

export const Route = createFileRoute('/_authenticated/add-bird')({
    component: AddBird,
});

function AddBird() {
    const { getToken } = useKindeAuth();
    const navigate = useNavigate();

    const [species, setSpecies] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState<FileState>(null);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [filePreviewURL, setFilePreviewURL] = useState<string | undefined>();

    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = await getToken();
        if (!token) {
            throw new Error("No token found");
        }

        setSubmissionMessage('Submitting bird sighting...');

        // Check if any required field is empty
        switch ('') {
          case species:
              setSubmissionMessage('Error: Please enter a species.');
              return;
          case location:
              setSubmissionMessage('Error: Please enter a location.');
              return;
          case date:
              setSubmissionMessage('Error: Please select a date.');
              return;
          default:
              break;
        }

        if (location.length > 20) {
            setSubmissionMessage('Error: Please limit location to 20 characters or less');
            return;
        }

        // Check if the uploaded file is an image
        if (image && !image.type.startsWith('image/')) {
            setSubmissionMessage('Error: Please upload an image file.');
            return;
        }

        try {
            const data = {
                species: species,
                location: location,
                date: date,
                imageUrl: '',
            }

            if (image) {
                const signedURLResponse = await fetch(
                    import.meta.env.VITE_APP_API_URL + "/signed-url",
                    {
                        method: "POST",
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contentType: image.type,
                            contentLength: image.size,
                            checksum: await computeSHA256(image),
                        }),
                    }
                );
                if (!signedURLResponse.ok) {
                    throw new Error("An error occurred while adding the bird.");
                }
                const { url } = (await signedURLResponse.json()) as { url: string };

                await fetch(url, {
                    method: "PUT",
                    body: image,
                    headers: {
                        "Content-Type": image.type,
                    },
                });

                const imageUrl = url.split("?")[0];
                data.imageUrl = imageUrl;
            }

            const res = await fetch(import.meta.env.VITE_APP_API_URL + '/birds', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,

                },
            });

            if (!res.ok) {
                throw new Error("An error occurred while creating the expense.");
            }
            const json = await res.json();

            setSpecies('');
            setLocation('');
            setDate('');
            setImage(null);
            setSubmissionMessage('Bird sighting recorded!');
            navigate({ to: '/my-birds' });
            return json.bird;
        } catch (error) {
            setSubmissionMessage(`Error: ${(error as Error).message}`);
        }
    };

    return (
        <div id="add-bird-component">
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
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div id="image-input" className="input-div">
                    <label htmlFor="image">Image:</label>

                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setImage(file);
                                const url = URL.createObjectURL(file);
                                setFilePreviewURL(url);
                                computeSHA256(file).then(hash => {
                                    console.log('SHA256 hash:', hash);
                                    // You can use the hash for validation or other purposes
                                }).catch(err => console.error('Error calculating hash:', err));
                            } else {
                                setImage(null);
                                setFilePreviewURL(undefined);
                            }
                        }}
                    />
                </div>
                <div className="input-div" id="image-preview-div">
                  <p>Currently selected image:</p>
                  <div>
                    {filePreviewURL ? (
                      <img src={filePreviewURL} alt="Preview of Uploaded Image" id="image-preview"/>
                    ) : (
                      <p>No image selected</p>
                    )}
                  </div>
                </div>
                <button type="submit" id="add-bird-button">
                    Add Bird
                </button>
                {submissionMessage && <p id="submission-message">{submissionMessage}</p>}
            </form>
        </div>
    );
}

export default AddBird;