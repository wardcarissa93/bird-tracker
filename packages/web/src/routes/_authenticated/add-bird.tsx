import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/add-bird')({
    component: MyBirds,
});

function MyBirds() {
    const navigate = useNavigate();
    const [species, setSpecies] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionMessage('Submitting bird sighting...'); // Display submission message

        // Check if the species is entered
        if (!species) {
            setSubmissionMessage('Error: Please enter a species.');
            return;
        }

        // Check if the location is entered
        if (!location) {
          setSubmissionMessage('Error: Please enter a location.');
          return;
        }

        // Check if the date is selected
        if (!date) {
            setSubmissionMessage('Error: Please select a date.');
            return;
        }

        try {
            const newBird = { species, location, date };

            const res = await fetch(import.meta.env.VITE_APP_API_URL + '/birds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bird: newBird }),
            });
            await res.json(); // Assuming you don't need to use the response data

            // Clear form fields directly
            setSpecies('');
            setLocation('');
            setDate('');

            // Set success message
            setSubmissionMessage('Bird Sighting Recorded!');

            navigate({ to: '/my-birds' });
        } catch (error) {
            // Display error message
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
                <button type="submit" id="add-bird-button">
                    Add Bird
                </button>
                {submissionMessage && <p id="submission-message">{submissionMessage}</p>}
            </form>
        </div>
    );
}

export default MyBirds;
