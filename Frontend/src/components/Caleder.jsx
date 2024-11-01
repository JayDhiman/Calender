import React, { useState } from 'react';
import { MdArrowBack, MdArrowForward, MdAdd } from 'react-icons/md';

const Caleder = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const isToday = (day) => {
        return day === currentDate.getDate() && 
               currentMonth === currentDate.getMonth() && 
               currentYear === currentDate.getFullYear();
    };

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
                <button 
                    className="flex items-center px-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                >
                    <MdAdd />
                    <span className='text-sm'> Add </span>
                </button>
            </div>
            
            {/* Current Month and Year */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-center flex items-center  gap-2 ">
                    <h2 className="text-lg opacity-95font-semibold text-gray-700">{monthsOfYear[currentMonth]}</h2>
                    <h2 className="text-md text-gray-500">{currentYear}</h2>
                </div>
                <div className="flex space-x-2">
                    <button 
                        className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition duration-200"
                        onClick={handlePreviousMonth}
                    >
                        <MdArrowBack className="text-gray-600" />
                    </button>
                    <button 
                        className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition duration-200"
                        onClick={handleNextMonth}
                    >
                        <MdArrowForward className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Days of the Week */}
            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700 text-sm">
                {daysOfWeek.map((day) => (
                    <div key={day} className="p-2 bg-gray-100 rounded-lg shadow">{day}</div>
                ))}
            </div>

            {/* Days of the Month */}
            <div className="grid grid-cols-7 gap-2 mt-2">
                {/* Empty slots for alignment */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-10"></div>
                ))}

                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const dayNumber = day + 1;
                    const currentDayOfWeek = (firstDayOfMonth + day) % 7; // 0=Sun, 1=Mon,... 

                    return (
                        <div 
                            key={dayNumber}
                            className={`h-16 flex items-center justify-center border border-gray-300 rounded-lg transition-transform transform hover:scale-105 
                            ${isToday(dayNumber) ? 'bg-blue-300 font-bold' : 'hover:bg-blue-100 cursor-pointer'}
                            ${currentDayOfWeek === 0 || currentDayOfWeek === 6 ? 'text-red-600' : 'text-gray-800'}`}
                        >
                            {dayNumber}
                        </div>
                    );
                })}

                {/* Empty slots for remaining days of the week */}
                {Array.from({ length: (7 - (firstDayOfMonth + daysInMonth) % 7) % 7 }).map((_, index) => (
                    <div key={`empty-end-${index}`} className="h-10"></div>
                ))}
            </div>
        </div>
    );
};

export default Caleder;
