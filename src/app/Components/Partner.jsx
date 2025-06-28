'use client'
import React from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Import your partner logos
import Partner1 from '../assets/images/partner1.png'
import Partner2 from '../assets/images/partner2.png'
import Partner3 from '../assets/images/partner3.png'
import Partner4 from '../assets/images/partner4.png'
import Partner5 from '../assets/images/partner5.png'

export default function Partner() {
  const partners = [
    { id: 1, logo: Partner1, alt: 'Partner 1' },
    { id: 2, logo: Partner2, alt: 'Partner 2' },
    { id: 3, logo: Partner3, alt: 'Partner 3' },
    { id: 4, logo: Partner4, alt: 'Partner 4' },
    { id: 5, logo: Partner5, alt: 'Partner 5' },
  ]

  // Duplicate partners for seamless looping
  const sliderPartners = [...partners, ...partners]

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000, // Animation speed
    autoplay: true,
    autoplaySpeed: 0, // Continuous scrolling
    cssEase: 'linear',
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    rtl: true, // Right-to-left direction (creates left-to-right visual)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Exactly 3 on mobile
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  }

  return (
    <div className='w-full py-16 overflow-hidden relative px-4 sm:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12 px-4'>
          <span className='bg-[#A52A2A] text-white px-4 py-1 text-sm inline-block mb-2 rounded-md'>
            Partners & Clients
          </span>
          <h2 className='font-poppins font-bold text-3xl md:text-4xl lg:text-[48px] leading-[56px] text-gray-900'>
            We work with the best people
          </h2>
        </div>

        <div className='relative w-full h-32'>
          {/* Gradient overlays */}
          <div className='absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-white via-white/90 to-transparent'></div>
          <div className='absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-white via-white/90 to-transparent'></div>

          {/* Slider with left-to-right motion */}
          <Slider {...settings}>
            {sliderPartners.map((partner, index) => (
              <div key={`${partner.id}-${index}`} className='px-2'>
                <div className='h-32 relative opacity-80 hover:opacity-100 transition-opacity duration-300'>
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    fill
                    className='object-contain'
                    sizes="(max-width: 768px) 33vw, 150px"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}