import React from 'react';
import Container from "../components/Container"
import Calendar from '../components/Caleder';
import EventList from '../components/EventList';

const MainPage = () => {
  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl w-full p-6 bg-white rounded-lg shadow-xl flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:max-h-[80vh] overflow-auto">
          <Calendar />
        </div>

        <div className="flex-1 p-4 bg-blue-500 bg-opacity-70 rounded-lg shadow-lg md:max-h-[80vh] ">

      <EventList />

 
        </div>
      </div>
    </Container>
  );
};

export default MainPage;
