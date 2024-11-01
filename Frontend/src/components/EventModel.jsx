import React from 'react';

const EventModal = ({ event, onClose, onUpdate }) => {
  if (!event) return null; // Don't render if no event is selected

  const handleUpdate = () => {
    // Implement the update logic here
    // Call onUpdate with the updated event object
    const updatedEvent = { ...event, title: 'Updated Event Title' }; // Example update
    onUpdate(updatedEvent);
    onClose(); // Close the modal after updating
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p><strong>Date:</strong> {event.dateTime.toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              // Implement delete logic here, for example:
              // handleDelete(event.id);
              onClose(); // Close the modal after deletion
            }}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
