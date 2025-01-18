import React, { useState } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  FilterList 
} from '@mui/icons-material';

const EventManagement = () => {
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'Team Standup', 
      date: '2023-06-15', 
      category: 'Work' 
    },
    { 
      id: 2, 
      title: 'Product Meeting', 
      date: '2023-06-20', 
      category: 'Meeting' 
    }
  ]);

  const [filter, setFilter] = useState('All');

  const filteredEvents = events.filter(
    event => filter === 'All' || event.category === filter
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <div className="flex space-x-4">
          <button 
            className="bg-blue-600 text-white p-2 rounded-lg 
            flex items-center hover:bg-blue-700"
          >
            <Add className="mr-2" /> Create Event
          </button>
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded-lg bg-white border"
            >
              <option value="All">All Categories</option>
              <option value="Work">Work</option>
              <option value="Meeting">Meeting</option>
              <option value="Personal">Personal</option>
            </select>
            <FilterList className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Event Title</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-100">
                <td className="p-4">{event.title}</td>
                <td className="p-4">{event.date}</td>
                <td className="p-4">
                  <span 
                    className={`
                      px-3 py-1 rounded-full text-sm 
                      ${event.category === 'Work' 
                        ? 'bg-blue-200 text-blue-800' 
                        : event.category === 'Meeting' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-yellow-200 text-yellow-800'
                      }
                    `}
                  >
                    {event.category}
                  </span>
                </td>
                <td className="p-4 flex justify-center space-x-2">
                  <button 
                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-full"
                  >
                    <Edit />
                  </button>
                  <button 
                    className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;