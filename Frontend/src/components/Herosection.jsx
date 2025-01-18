import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
  return (
<>
<section className="relative bg-gradient-to-r from-indigo-800 via-purple-900 to-gray-900 text-white text-center py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
  {/* Background Shapes */}
  <div className="absolute inset-0 z-10">
    {/* Circle 1 */}
    <div className="absolute top-10 left-10 w-12 h-12 sm:w-44 sm:h-44 bg-indigo-500 rounded-full opacity-30"></div>
    {/* Circle 2 */}
    <div className="absolute top-1/2 right-20 w-16 h-16 sm:w-24 sm:h-24 bg-pink-500 rounded-full opacity-40"></div>
    {/* Square 1 */}
    <div className="absolute bottom-10 left-1/3 w-20 h-20 sm:w-28 sm:h-28 bg-purple-600 opacity-40 transform rotate-12"></div>
    {/* Square 2 */}
    <div className="absolute top-1/3 right-1/4 w-16 h-16 sm:w-40 sm:h-40 bg-yellow-500 opacity-30 transform rotate-45"></div>
    {/* Triangle */}
    <div className="absolute -top-12 left-1/4 bg-red-100 w-44 h-44 border-l-16 border-r-16 border-b-32 border-transparent border-b-blue-500 opacity-30 transform -rotate-12"></div>
    {/* Rectangle */}
    <div className="absolute bottom-0 right-0 w-32 h-16 sm:w-40 sm:h-20 bg-indigo-700 opacity-50 transform rotate-6"></div>
  </div>

  {/* Content */}
  <div className="relative container mx-auto px-4 z-20">
    <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
      Your Ultimate Calendar
    </h1>
    <p className="text-[10px] sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-7">
      Effortlessly organize your life, manage events, and stay on top of your schedule.
    </p>
    <div className="flex justify-center space-x-4">
      <Link to="/signup">
        <button className="bg-white text-blue-600 px-3 py-1 text-[9px] sm:text-sm lg:text-lg sm:px-6 sm:py-3 rounded-lg font-semibold transition duration-300 hover:bg-transparent hover:border hover:text-white">
          Sign Up
        </button>
      </Link>
      <Link to="/login">
        <button className="border border-white px-3 py-1 text-[9px] sm:text-sm lg:text-lg sm:px-6 sm:py-3 rounded-lg font-semibold transition duration-300 hover:bg-white hover:text-blue-600">
          Login
        </button>
      </Link>
    </div>
  </div>
</section>
</>
  )
}

export default Herosection