import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

type FileState = File | null;

export const Route = createFileRoute('/_authenticated/add-bird')({
    component: AddBird,
});

function AddBird() {
    const navigate = useNavigate();

    const [species, setSpecies] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState<FileState>(null);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionMessage('Submitting bird sighting...');

        // Check if any required field is empty
        if (!species || !location || !date) {
            setSubmissionMessage('Error: Please fill in all required fields.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('species', species);
            formData.append('location', location);
            formData.append('date', date);
            if (image) {
                formData.append('image', image);
            }

            const res = await fetch(import.meta.env.VITE_APP_API_URL + '/birds', {
                method: 'POST',
                body: formData,
            });
            await res.json();

            setSpecies('');
            setLocation('');
            setDate('');
            setImage(null);
            setSubmissionMessage('Bird sighting recorded!');
            navigate({ to: '/my-birds' });
        } catch (error) {
            setSubmissionMessage(`Error: ${(error as Error).message}`);
        }
    };

    const [filePreviewURL, setFilePreviewURL] = useState<string | undefined>();

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
                          // setImage(e.target.files?.[0] || null);
                          // console.log("filePreviewURL: ", filePreviewURL);
                          // if (filePreviewURL) {
                          //   URL.revokeObjectURL(filePreviewURL);
                          // }
                          // if (image) {
                          //   console.log("image: ", image);
                          //   const url = URL.createObjectURL(image);
                          //   setFilePreviewURL(url);
                          // } else {
                          //   setFilePreviewURL(undefined);
                          // }
                          const file = e.target.files?.[0];
                          if (file) {
                            setImage(file);
                            const url = URL.createObjectURL(file);
                            setFilePreviewURL(url);
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