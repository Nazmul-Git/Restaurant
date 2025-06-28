'use client';
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Team1 from '../assets/images/team.jpg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Dynamically import Slider with SSR disabled
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div className="text-center p-4">Loading team...</div>
});



export default function Team() {
  const teamMembers = [
    {
      name: "John Doe",
      position: "CEO & Founder",
      image: Team1
    },
    {
      name: "Jane Smith",
      position: "Design Director",
      image: Team1
    },
    {
      name: "Mike Johnson",
      position: "Lead Developer",
      image: Team1
    },
    {
      name: "Sarah Williams",
      position: "Marketing Head",
      image: Team1
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="w-full py-16 bg-[#AD1519D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4">
            Our Team
          </h2>
          <p className="font-poppins text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Meet our talented team members who make everything possible
          </p>
        </div>

        {/* Team Slider */}
        <div className="slider-container px-2">
          <Slider {...sliderSettings}>
            {teamMembers.map((member, index) => (
              <div key={index} className="px-2 focus:outline-none">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      placeholder="blur"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-poppins font-bold text-xl text-white">{member.name}</h3>
                    <p className="font-poppins font-medium text-white/70 mt-2">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Custom styling for slider dots */}
      <style jsx global>{`
        .slick-dots li button:before {
          color: white !important;
          opacity: 0.5 !important;
          font-size: 10px !important;
        }
        .slick-dots li.slick-active button:before {
          color: white !important;
          opacity: 1 !important;
        }
        .slick-prev:before, .slick-next:before {
          color: white !important;
        }
      `}</style>
    </section>
  );
}