import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModel";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    setCurrentEvent(null);
    setShowModal(true);
  };

  const handleNavigate = (direction) => {
    const newDate =
      direction === "prev"
        ? moment(currentDate).subtract(1, "month").toDate()
        : moment(currentDate).add(1, "month").toDate();
    setCurrentDate(newDate);
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "blue",
        color: "white",
        borderRadius: "8px",
        padding: "5px",
      },
    };
  };

  const CustomToolbar = () => (
    <div className="flex items-center justify-between mb-4">
      {/* Month and Year Display */}

      <div className=" flex items-center gap-6 justify-center">
 
      <div className="text-xl font-bold text-gray-700">
        {moment(currentDate).format("MMMM YYYY")}
      </div>

       {/* View Buttons */}
       <div className="flex space-x-2">
          {["month", "week", "day"].map((viewOption) => (
            <button
              key={viewOption}
              className={`px-4 py-2 rounded-md text-sm ${
                view === viewOption
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setView(viewOption)}
            >
              {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
            </button>
          ))}
        </div>
      </div>


      <div className="">
      {/* Navigation and Add Event Button */}
      <div className="flex items-center space-x-4">
        {/* Arrows */}
        <IconButton onClick={() => handleNavigate("prev")}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => handleNavigate("next")}>
          <ArrowForward />
        </IconButton>

        {/* Add Event Button */}
        <button
          onClick={handleAddEvent}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Event
        </button>
      </div>
      </div>
    </div>
  );

  return (
    <div className="calendar-container mx-auto mt-8 p-6 max-w-full rounded-lg shadow-lg bg-white">
      {/* Custom Toolbar */}
      <CustomToolbar />

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        date={currentDate}
        view="month"
        onNavigate={(newDate) => setCurrentDate(newDate)}
        startAccessor="startTime"
        endAccessor="endTime"
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: () => null, // Disable default toolbar
        }}
      />

      {/* Event Modal */}
      {showModal && (
        <EventModal event={currentEvent} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CalendarComponent;
