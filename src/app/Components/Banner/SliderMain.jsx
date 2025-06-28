'use client';
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import Slider with SSR disabled
const Slider = dynamic(() => import('react-slick'), { ssr: false });

// Import local images
import breakfastImage from '../../assets/images/breakfast1.png';
import lunchImage from '../../assets/images/lunch1.png';
import dinnerImage from '../../assets/images/dinner1.png';
import otherImage from '../../assets/images/others1.png';
import thumb1 from '../../assets/images/breakfast1.png';
import thumb2 from '../../assets/images/lunch1.png';
import thumb3 from '../../assets/images/dinner1.png';
import thumb4 from '../../assets/images/others1.png';

export default function SliderMain() {
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

    // Slide data
    const slides = [
        {
            id: 1,
            title: "BREAKFAST",
            description: "Breakfast, often referred to as the 'most important meal of the day', provides essential nutrients to kick start our day. It includes a variety of foods, like fruits, cereals, dairy products, and proteins, that contribute to a balanced diet.",
            bgColor: "bg-[#880808]",
            circleColor: "bg-white/10",
            mainImage: breakfastImage,
            thumbImage: thumb1
        },
        {
            id: 2,
            title: "LUNCH",
            description: "Lunch offers the perfect midday break with nutritionally balanced meals that refuel your body and mind. Our carefully crafted menu features fresh, seasonal ingredients prepared with culinary expertise to deliver both flavor and essential nutrients for sustained energy throughout the afternoon.",
            bgColor: "bg-[#124767]",
            circleColor: "bg-black/10",
            mainImage: lunchImage,
            thumbImage: thumb2
        },
        {
            id: 3,
            title: "DINNER",
            description: "Dinner is a time to unwind and enjoy exquisite culinary creations that satisfy both palate and soul. Our chefs prepare each evening meal with premium ingredients, combining traditional techniques with innovative flavors to create memorable dining experiences that nourish and delight.",
            bgColor: "bg-[#923353]",
            circleColor: "bg-white/10",
            mainImage: dinnerImage,
            thumbImage: thumb3
        },
        {
            id: 4,
            title: "SPECIALS",
            description: "Our specials showcase the chef's creativity with limited-time offerings that highlight seasonal ingredients at their peak. Each carefully composed dish tells a story through its flavors, textures, and presentation, offering a unique gastronomic journey for our discerning guests.",
            bgColor: "bg-[#006666]",
            circleColor: "bg-white/10",
            mainImage: otherImage,
            thumbImage: thumb4
        }
    ];

    const mainSettings = {
        asNavFor: nav2,
        ref: slider1,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        dots: false,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 1000,
        arrows: false, // Disable arrows for all screens
        beforeChange: (current, next) => {
            setNav1(slider1.current);
            setNav2(slider2.current);
        }
    };

    const thumbSettings = {
        asNavFor: nav1,
        ref: slider2,
        slidesToShow: 4,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
        centerMode: false,
        infinite: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    };

    return (
        <div className="relative w-full h-auto min-h-[812px] md:h-[964px] overflow-hidden">
            <style jsx global>{`
                .hero-slider .slick-slide {
                    height: 812px;
                    display: flex !important;
                    flex-direction: column;
                }
                @media (min-width: 768px) {
                    .hero-slider .slick-slide {
                        height: 964px;
                        display: block !important;
                    }
                }
                .hero-slider .slick-slide > div {
                    height: 100%;
                }
                .main-image-container {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    height: 400px;
                    margin: 2rem auto 0;
                }
                @media (min-width: 768px) {
                    .main-image-container {
                        position: absolute;
                        right: 80px;
                        bottom: 30px;
                        width: 630px;
                        height: 630px;
                        margin: 0;
                        max-width: none;
                    }
                }
                .main-image {
                    border-radius: 50%;
                    object-fit: contain;
                    width: 100% !important;
                    height: 100% !important;
                }
                .hero-slider .slick-slide.slick-current .main-image-container {
                    animation: sliderLayerAnimation 1s alternate;
                }
                @keyframes sliderLayerAnimation {
                    0% { transform: rotate(45deg) translate(120px, -400px); }
                    100% { transform: rotate(0deg) translate(0); }
                }
                .thumb-slider-container {
                    position: absolute;
                    left: 0;
                    bottom: 20px;
                    width: 100%;
                    z-index: 10;
                    padding: 0 20px;
                }
                @media (min-width: 768px) {
                    .thumb-slider-container {
                        position: absolute;
                        left: 18%;
                        bottom: 350px;
                        height:100px
                        width: auto;
                        max-width: 600px;
                        transform: translateX(-50%);
                    }
                }
                .thumb-item {
                    position: relative;
                    width: 60px !important;
                    height: 60px !important;
                    margin: 0 auto;
                }
                @media (min-width: 768px) {
                    .thumb-item {
                        width: 120px !important;
                        height: 120px !important;
                    }
                }
                .thumb-image {
                    border-radius: 50%;
                    object-fit: cover;
                    width: 100% !important;
                    height: 100% !important;
                    border: 2px solid rgba(255,255,255,0.3);
                    transition: all 0.3s ease;
                }
                .slick-current .thumb-image {
                    border: 3px solid white;
                    transform: scale(1.1);
                }
                .mobile-arrow {
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 40%;
                    transform: translateY(-50%);
                    z-index: 10;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .mobile-arrow:hover {
                    background: rgba(255,255,255,0.5);
                }
                .mobile-arrow.prev {
                    left: 10px;
                }
                .mobile-arrow.next {
                    right: 10px;
                }
                @media (min-width: 768px) {
                    .mobile-arrow {
                        display: none;
                    }
                }
            `}</style>

            {/* Main Slider */}
            <div className="relative h-full w-full">
                {/* Mobile Arrows */}
                <div className="mobile-arrow prev md:hidden" onClick={() => slider1.current.slickPrev()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                
                <Slider className="hero-slider h-full w-full" {...mainSettings}>
                    {slides.map((slide) => (
                        <div key={slide.id} className={`relative h-full w-full overflow-hidden ${slide.bgColor}`}>
                            {/* Decorative circles */}
                            <div className={`hidden md:block border-0 rounded-full w-[1079px] h-[1079px] absolute left-[-156.98px] top-[-360px] rotate-[-14.55deg] ${slide.circleColor}`}></div>
                            <div className={`hidden md:block border-0 rounded-full w-[1312.52px] h-[1282.4px] left-[1534.2px] top-[300.96px] absolute rotate-[-52deg] ${slide.circleColor}`}></div>

                            {/* Header */}
                            <div className='flex'>
                                <div className='hidden md:block w-[211px] h-[48px] top-[51px] left-[65px] absolute text-white font-poppins font-bold text-[32px] leading-[100%] tracking-[0%]'>
                                    Restaurant
                                </div>
                                <div className='relative w-full md:w-[821px] h-[51px] top-[50px] left-[50%] translate-x-[-50%] md:left-[1039px] md:translate-x-0 px-4 md:px-0'>
                                    <div className='absolute inset-y-0 left-4 md:left-0 flex items-center pl-3 pointer-events-none'>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        placeholder='Search...'
                                        className='w-full h-full bg-white rounded-[20px] pl-10 pr-4'
                                    />
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className='main-image-container'>
                                <Image
                                    src={slide.mainImage}
                                    alt={slide.title}
                                    fill
                                    className="main-image"
                                    sizes="(max-width: 768px) 500px, 630px"
                                    priority
                                />
                            </div>

                            {/* Content */}
                            <div className="absolute w-full md:w-[900px] h-auto md:h-[222px] top-[60%] md:top-[243px] left-[5%] md:left-[88px] px-4 md:px-0">
                                <h1 className="text-white font-poppins font-normal text-4xl md:text-[96px] leading-[100%]">
                                    {slide.title}
                                </h1>
                                <p className="text-white font-poppins font-medium text-sm md:text-[20px] mt-4 md:mt-0 leading-[130%] md:leading-[100%]">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>

                <div className="mobile-arrow next md:hidden" onClick={() => slider1.current.slickNext()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Thumbnail Slider */}
            <div className="thumb-slider-container cursor-pointer">
                <Slider {...thumbSettings} className="w-full">
                    {slides.map((slide) => (
                        <div
                            key={`thumb-${slide.id}`}
                            className="px-2"
                            onClick={() => {
                                slider1.current.slickGoTo(slide.id - 1);
                            }}
                        >
                            <div className="thumb-item">
                                <Image
                                    src={slide.thumbImage}
                                    alt={`Thumbnail ${slide.title}`}
                                    fill
                                    className="thumb-image"
                                    sizes="(max-width: 768px) 60px, 70px"
                                />
                            </div>
                            <div className="text-center mt-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                {slide.title}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}