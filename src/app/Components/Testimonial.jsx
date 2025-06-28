'use client'
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images
import Avatar1 from '../assets/images/customer1.png';
import Sushi1 from '../assets/images/shape.png';

const Testimonial = () => {
    const testimonials = [
        {
            id: 1,
            feedback: "Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick.",
            name: "Tayyab Sohail",
            designation: "UX/UI Designer",
            avatar: Avatar1,
        },
        {
            id: 2,
            feedback: "The best sushi I've ever had! Perfectly balanced flavors and fresh ingredients. Will definitely come back again.",
            name: "Sarah Johnson",
            designation: "Food Critic",
            avatar: Avatar1,
        },
        {
            id: 3,
            feedback: "Exceptional quality and service. Every bite was a delight. Highly recommend their signature rolls!",
            name: "Michael Chen",
            designation: "Restaurant Owner",
            avatar: Avatar1,
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        appendDots: dots => (
            <div className="ml-auto">
                <ul className="flex items-center justify-center">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        )
    };

    return (
        <div className="w-full max-w-[1308px] mx-auto min-h-[590px] px-4 sm:px-8 md:px-12 md:mt-96 mt-28">
            <h2 className="font-poppins font-bold text-3xl md:text-[50px] leading-[120%] mb-8 md:text-left text-center">Customer <span className='text-red-800'>Feedback</span></h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side - Slider for Customer Details */}
                <div className="w-full md:w-[55%]">
                    <Slider {...settings}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="h-[220px]">
                                <div className="flex flex-col gap-10 ">
                                    <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8">
                                        {testimonial.feedback}
                                    </p>
                                    <div className="flex items-center">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mr-3 md:mr-4">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                                placeholder="blur"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center justify-between p-2">
                                            <div>
                                                <p className="font-bold text-lg md:text-xl">{testimonial.name}</p>
                                                <p className="text-gray-600 text-sm md:text-base">{testimonial.designation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Right Side - Fixed Product Image */}
                <div className="w-full md:w-[45%] h-[400px] relative">
                    <div className="w-full h-full max-w-[400px] mx-auto md:mx-0  rounded-lg overflow-hidden ">
                        {/* Vector effect container */}
                        <div className="absolute left-0 bottom-0 w-full h-full clip-path-vector bg-[#AD1519]">
                            <Image
                                src={Sushi1}
                                alt="Featured food"
                                className="absolute"
                                placeholder="blur"
                                priority
                                sizes="(max-width: 668px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>

                {/* Add this to your global CSS or CSS module */}
                <style jsx global>{`
  .clip-path-vector {
    clip-path: polygon(0 20%, 100% 0, 100% 100%, 0% 100%);
  }
`}</style>
            </div>
        </div>
    );
};

export default Testimonial;