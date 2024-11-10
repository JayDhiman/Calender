import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModel'
import { Tooltip, IconButton } from '@mui/material';
import { EventNote } from '@mui/icons-material';
import { useGetEventsQuery } from '../Api/eventsApi';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const { data, isError, isLoading } = useGetEventsQuery();
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const events = Array.isArray(data?.data) ? data.data : [];

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    setCurrentEvent(null);
    setShowModal(true);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    switch (event.category) {
      case 'Work':
        backgroundColor = 'bg-blue-500 hover:bg-blue-600';
        break;
      case 'Personal':
        backgroundColor = 'bg-red-500 hover:bg-red-600';
        break;
      case 'Meeting':
        backgroundColor = 'bg-green-500 hover:bg-green-600';
        break;
      case 'Others':
        backgroundColor = 'bg-gray-500 hover:bg-gray-600';
        break;
      default:
        backgroundColor = 'bg-indigo-500 hover:bg-indigo-600';
        break;
    }
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '8px',
        padding: '12px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease-in-out, transform 0.2s',
      },
    };
  };

  const renderEvent = (event) => (
    <Tooltip title={event.title} placement="top">
      <div className={`rbc-event p-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 ${eventStyleGetter(event).style.backgroundColor}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-white">{event.title}</span>
          <IconButton className="text-white text-xs hover:bg-white hover:bg-opacity-20 rounded-full" onClick={() => handleEventClick(event)}>
            <EventNote />
          </IconButton>
        </div>
      </div>
    </Tooltip>
  );

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;

  if (isError) {
    if (isError.status === 401) {
      return <div className="text-center text-lg">Please log in to access your events.</div>;
    }
    return <div className="text-center text-lg">Error loading events. Please try again later.</div>;
  }

  return (
    <div className="calendar-container mx-auto mt-8 p-6 max-w-full rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Event Calendar</h1>
      <button
        onClick={handleAddEvent}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add Event
      </button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startTime"
        endAccessor="endTime"
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: renderEvent,
        }}
      />
      {showModal && <EventModal event={currentEvent} closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default CalendarComponent;