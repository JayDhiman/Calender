import React from 'react';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-[7rem]">
        <h1 className="text-6xl font-bold mb-4">Your Ultimate Calendar</h1>
        <p className="mb-8 text-lg">Effortlessly organize your life, manage events, and stay on top of your schedule.</p>
        
       <Link to={"/signup"}>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold mr-4 transition duration-300 hover:bg-transparent hover:border hover:text-white">Sign Up</button>
       </Link>
       
       <Link to={"/login"}>
        <button className="border border-white px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-white hover:text-blue-500">Login</button>
       </Link>

      </section>

      {/* Features Overview */}
      <section className="py-20">
        <h2 className="text-5xl text-center mb-12">Features That Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div class="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
       <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
    <img class="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
         src="https://images.unsplash.com/photo-1496436818536-e239445d3327?q=80&w=1200" alt="investment-seed-round" />
  </div>
  <div class="p-4">
    <h6 class="mb-2 text-slate-800 text-xl font-semibold">
      Successful Seed Round
    </h6>
    <p class="text-slate-600 leading-normal font-light">
      We are thrilled to announce the completion of our seed round, securing $2M in investment to fuel product development and market expansion.
    </p>
  </div>

</div> 
<div class="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
  <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
    <img class="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
         src="https://images.unsplash.com/photo-1496436818536-e239445d3327?q=80&w=1200" alt="investment-seed-round" />
  </div>
  <div class="p-4">
    <h6 class="mb-2 text-slate-800 text-xl font-semibold">
      Successful Seed Round
    </h6>
    <p class="text-slate-600 leading-normal font-light">
      We are thrilled to announce the completion of our seed round, securing $2M in investment to fuel product development and market expansion.
    </p>
  </div>

</div> 
          <div class="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
  <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
    <img class="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
         src="https://images.unsplash.com/photo-1496436818536-e239445d3327?q=80&w=1200" alt="investment-seed-round" />
  </div>
  <div class="p-4">
    <h6 class="mb-2 text-slate-800 text-xl font-semibold">
      Successful Seed Round
    </h6>
    <p class="text-slate-600 leading-normal font-light">
      We are thrilled to announce the completion of our seed round, securing $2M in investment to fuel product development and market expansion.
    </p>
  </div>
  
</div> 
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-5xl text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-around px-6">
          <div className="text-center mb-8">
            <img src="https://via.placeholder.com/100" alt="Step 1" className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">1. Sign Up</h3>
            <p>Create your account in under a minute using just your email.</p>
          </div>
          <div className="text-center mb-8">
            <img src="https://via.placeholder.com/100" alt="Step 2" className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">2. Create Events</h3>
            <p>Easily add events with a few clicks and set your preferences.</p>
          </div>
          <div className="text-center mb-8">
            <img src="https://via.placeholder.com/100" alt="Step 3" className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">3. Set Reminders</h3>
            <p>Get reminders via email or push notifications to stay on track.</p>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-20">
        <h2 className="text-5xl text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="italic">"This calendar has transformed the way I organize my life! I can't imagine going back to the old way."</p>
            <h4 className="font-bold mt-4">- Sarah J.</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="italic">"Reminders keep me on track. I love how intuitive it is to use!"</p>
            <h4 className="font-bold mt-4">- Mark T.</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="italic">"Sharing my calendar with friends has made planning events so much easier!"</p>
            <h4 className="font-bold mt-4">- Emma L.</h4>
          </div>
        </div>
      </section>

      {/* App Interface Preview */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-5xl text-center mb-12">See It in Action</h2>
        <div className="flex justify-center mb-4">
          <img src="https://via.placeholder.com/500x300" alt="App Preview" className="w-full max-w-2xl" />
        </div>
        <p className="text-center">Watch our demo video to learn more about the features and functionalities!</p>
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-blue-600">Watch Demo</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="flex justify-center space-x-6">
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
        </div>
        <div className="text-center mt-4">
          &copy; {new Date().getFullYear()} Your Calendar. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
