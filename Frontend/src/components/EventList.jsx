import React, { useState } from 'react';
import EventModal from "./EventModel"

// Sample events with different colors
const eventsData = [
  { id: 1, title: 'Team Meeting', dateTime: new Date('2024-11-01T10:00:00'), description: 'Discuss project updates and deadlines.', duration: 60, location: 'Zoom', colorCode: '#FFCCBC' },
  { id: 2, title: 'Client Call', dateTime: new Date('2024-11-02T14:00:00'), description: 'Weekly check-in with the client.', duration: 30, location: 'Google Meet', colorCode: '#BBDEFB' },
  { id: 3, title: 'Design Review', dateTime: new Date('2024-11-03T13:00:00'), description: 'Review design mockups and get feedback.', duration: 45, location: 'Office', colorCode: '#C8E6C9' },
  { id: 4, title: 'Project Deadline', dateTime: new Date('2024-11-05T17:00:00'), description: 'Final submission for the project.', duration: 60, location: 'N/A', colorCode: '#FFAB91' },
  // Add more events for testing scroll
  { id: 5, title: 'Lunch with Team', dateTime: new Date('2024-11-06T12:00:00'), description: 'Discussing the upcoming project.', duration: 60, location: 'Café', colorCode: '#D1C4E9' },
  { id: 6, title: 'Workshop', dateTime: new Date('2024-11-07T09:00:00'), description: 'Hands-on workshop on React.', duration: 120, location: 'Office', colorCode: '#B2DFDB' },
  { id: 7, title: 'Presentation', dateTime: new Date('2024-11-08T11:00:00'), description: 'Presenting the project to stakeholders.', duration: 90, location: 'Zoom', colorCode: '#FFAB91' },
  { id: 8, title: 'Feedback Session', dateTime: new Date('2024-11-09T15:00:00'), description: 'Gathering feedback from the team.', duration: 30, location: 'Office', colorCode: '#FFCCBC' },
];

const EventList = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(eventsData);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleUpdate = (updatedEvent) => {
    const updatedEvents = events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
    setEvents(updatedEvents);
  };

  const handleDelete = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <div className="h-full bg-white p-4 rounded-lg shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Upcoming Events
      </h2>
      <div className="flex-grow overflow-y-auto"> {/* Ensures the white div grows to fill the parent height */}
        {events.map(event => (
          <div
            key={event.id}
            className="mb-4 p-4 rounded-lg shadow transition-shadow duration-200 cursor-pointer"
            style={{ backgroundColor: event.colorCode }}
          >
            <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
            <p className="text-gray-600">
              {event.dateTime.toLocaleDateString()} at {event.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="mt-2 text-gray-800">{event.description}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleEventClick(event)}
              >
                View
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleEventClick(event)} // Use the same modal for viewing and updating
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <EventModal event={selectedEvent} onClose={closeModal} onUpdate={handleUpdate} />
    </div>
  );
};

export default EventList;
