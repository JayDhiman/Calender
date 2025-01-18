import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Kenzie Edgar",
            img: "https://i.pravatar.cc/100?img=1",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt ratione dolor "
        },
        {
            name: "Stevie Tifft",
            img: "https://i.pravatar.cc/100?img=2",
            text: "Lorem ipsum, dolor sit amet, consectetur adipisicing elit."
        },
        {
            name: "Tommie Ewart",
            img: "https://i.pravatar.cc/100?img=3",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. lam excepturi dicta error deleniti sequi."
        },
        {
            name: "Charlie Howse",
            img: "https://i.pravatar.cc/100?img=4",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A"
        },
        {
            name: "Nevada Herbertson",
            img: "https://i.pravatar.cc/100?img=5",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
        },
        {
            name: "Kris Stanton",
            img: "https://i.pravatar.cc/100?img=6",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
        }
    ];

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center  my-12 py-5">
            <div className="w-full bg-white   px-5 py-16 md:py-24 text-gray-800">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-10">
                        <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold mb-5 text-gray-600">What people <br />are saying.</h1>
                        <h3 className="text-sm sm:text-lg md:text-xl   font-light"> Seamless Scheduling for Every Occasion.</h3>
                        <h3 className="text-sm sm:text-lg md:text-xl mb-3 font-light">Bring Order to Your Busy Life.</h3>
                        <div className="text-center">
                            <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                            <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                            <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                            <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                            <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg flex p-4 items-start">
                                <div className="flex-shrink-0">
                                    <img
                                        src={testimonial.img}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                    />
                                </div>
                                <div className="ml-4">
                                    <h6 className="font-bold text-md text-gray-600">{testimonial.name}</h6>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                                        {testimonial.text}
                                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

         
        </div>
    );
};

export default Testimonials;
