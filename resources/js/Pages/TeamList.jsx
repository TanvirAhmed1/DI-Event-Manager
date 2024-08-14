import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamList = () => {
    const [teams, setTeams] = useState([]);

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

    return (
        <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teams List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teams.map(team => (
              <tr key={team.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default TeamList;