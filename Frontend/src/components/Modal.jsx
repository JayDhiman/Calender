import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [eventTitle, setEventTitle] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(eventTitle);
        setEventTitle('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Add Event</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        placeholder="Event Title"
                        required
                    />
                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="bg-gray-300 p-1 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600">Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
