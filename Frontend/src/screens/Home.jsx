import React from "react";
import reminder from "../assets/reminder.jpeg";
import event from "../assets/event.jpg";
import events from "../assets/events.jpg";
import reminders from "../assets/reminders.jpeg";
import signup from "../assets/signup.jpg";
import calender from "../assets/calender.png";

import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer/Footer";
import Herosection from "../components/Herosection";

const Home = () => {
  return (
    <div className="bg-gray-200 bg-opacity-35">
      {/* hero section */}
      <div>
        <Herosection />
      </div>

      <div className=" relative z-20 flex items-center justify-center md:container md:mx-auto -translate-y-10 sm:-translate-y-14 md:-translate-y-20 lg:-translate-y-24 xl:-translate-y-30 p-3  drop-shadow-xl ">
        <img src={calender} className=" object-cover" alt="" />
      </div>

      {/* Features Overview */}

      <section className="">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mb-4 text-indigo-500 font-semibold">
          Features That Matter
        </h2>

        {/* Event Feature */}
        <div className="bg-white  mx-3 p-2 sm:container sm:mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:shadow-2xl">
          <div className="flex flex-col md:flex-row items-center mb-12 px-6 transition-transform duration-300 ease-in-out ">
            <div className="md:w-1/2">
              <img
                className="w-full h-[160px] sm:h-[220px] md:h-[280px] lg:h-full  object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out "
                src={event}
                alt="Organize Your Events"
              />
            </div>

            <div className="md:w-1/2  p-2 text-center mt-2 ">
              <h6 className="mb-2 text-indigo-800 text-sm sm:text-lg font-semibold hover:text-indigo-600 transition-colors duration-300 ">
                Organize Your Events
              </h6>
              <p className=" text-gray-600 leading-normal font-light text-[10px] sm:text-sm mb-4 ">
                Manage your events with ease and get reminded before they start.
                Our intuitive interface allows you to quickly create, edit, and
                delete events without hassle.
              </p>
            </div>
          </div>

          {/* Reminder Feature */}
          <div className="flex flex-col md:flex-row items-center mb-12 px-6 transition-transform duration-300 ease-in-out  text-center">
            <div className="md:w-1/2 order-2 md:order-1 p-6">
              <h6 className="mb-2 text-indigo-800  font-semibold hover:text-indigo-600 transition-colors duration-300 sm:text-lg text-sm">
                Set Reminders
              </h6>
              <p className="text-gray-600 leading-normal font-light text-[10px] sm:text-sm mb-4">
                Get timely notifications via email or push to never miss an
                event. Tailor your reminder settings for each event to fit your
                needs.
              </p>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <img
                className=" w-[250px]  h-[180px] sm:w-[350px]  sm:h-[220px] md:w-full md:h-[300px] lg:h-full  object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out "
                src={reminder}
                alt="Set Reminders"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}

      <section className="py-20 bg-gray-100">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mb-4 text-indigo-500 font-semibold">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row justify-around px-6 space-y-6 md:space-y-0 md:space-x-6">
          {/* Card for Sign Up */}
          <div className="relative grid h-[15rem] sm:h-[20rem] max-w-full flex-col items-end justify-center overflow-hidden rounded-lg bg-white shadow-lg">
            <div
              className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-cover bg-center"
              style={{ backgroundImage: `url(${signup})` }}
            >
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/70"></div>
            </div>
            <div className="relative text-center p-6 px-6 py-10 md:px-12">
              <h3 className="mb-6 text-3xl font-medium text-white">
                1. Sign Up
              </h3>
              <p className="text-slate-300">
                Create your account in under a minute using just your email.
              </p>
            </div>
          </div>

          {/* Card for Create Events */}
          <div className="relative grid h-[15rem] sm:h-[20rem] max-w-full  flex-col items-end justify-center overflow-hidden rounded-lg bg-white shadow-lg">
            <div
              className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-cover bg-center"
              style={{ backgroundImage: `url(${events})` }}
            >
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/70"></div>
            </div>
            <div className="relative text-center p-6 px-6 py-10 md:px-12">
              <h3 className="mb-6 text-3xl font-medium text-white">
                2. Create Events
              </h3>
              <p className="text-slate-300">
                Easily add events with a few clicks and set your preferences.
              </p>
            </div>
          </div>

          {/* Card for Set Reminders */}
          <div className="relative grid h-[15rem] sm:h-[20rem] max-w-full  flex-col items-end justify-center overflow-hidden rounded-lg bg-white shadow-lg">
            <div
              className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-cover bg-center"
              style={{ backgroundImage: `url(${reminders})` }}
            >
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/70"></div>
            </div>
            <div className="relative text-center p-6 px-6 py-10 md:px-12">
              <h3 className="mb-6 text-3xl font-medium text-white">
                3. Set Reminders
              </h3>
              <p className="text-slate-300">
                Get reminders via email or push notifications to stay on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="">
        <Testimonials />
      </section>

      {/* Footer */}

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
