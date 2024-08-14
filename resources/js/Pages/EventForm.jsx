import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = () => {
    const [name, setName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [teamId, setTeamId] = useState('');
    const [teams, setTeams] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('/api/teams');
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams', error);
            }
        };

        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/events', { name, eventDate, team_id: teamId });
            setSuccessMessage('Event added successfully');
            setName('');
            setEventDate('');
            setTeamId('');
        } catch (error) {
            console.error('Error adding event', error);
        }
    };

    return (
            <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Event</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
                type="date"
                id="event_date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="team_id" className="block text-sm font-medium text-gray-700">Team</label>
            <select
                id="team_id"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            >
                <option value="">Select a team</option>
                {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
            </div>
            <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
            Submit
            </button>
        </form>
        </div>
  );

};

export default EventForm;