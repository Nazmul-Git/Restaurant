import {
  FaPinterest,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaLocationArrow
} from "react-icons/fa";
import Image from 'next/image';

import foodImage1 from '../../assets/images/footer1.jpg';
import foodImage2 from '../../assets/images/footer2.jpg';
import foodImage3 from '../../assets/images/footer3.jpg';
import foodImage4 from '../../assets/images/footer4.jpg';
import foodImage5 from '../../assets/images/footer5.jpg';
import foodImage6 from '../../assets/images/footer6.jpg';

export default function Footer() {
  const instagramImages = [
    foodImage1,
    foodImage2,
    foodImage3,
    foodImage4,
    foodImage5,
    foodImage6
  ];

  return (
    <footer className="bg-[#880808] text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Newsletter Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">RESTAURANT</h2>
          <p>Subscribe to our newsletter and get 25% off</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="px-4 py-2 rounded-l text-gray-800 placeholder:text-gray-600 bg-white w-full focus:outline-none"
            />
            <button
              className="bg-red-800 text-[#efefef] px-4 py-2 rounded-r font-bold hover:bg-gray-100 transition"
              aria-label="Subscribe"
            >
              <FaLocationArrow />
            </button>
          </div>
          <div className="flex space-x-4 text-xl pt-2">
            <a href="#" aria-label="Pinterest"><FaPinterest className="hover:text-gray-300 transition" /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF className="hover:text-gray-300 transition" /></a>
            <a href="#" aria-label="Twitter"><FaTwitter className="hover:text-gray-300 transition" /></a>
            <a href="#" aria-label="Instagram"><FaInstagram className="hover:text-gray-300 transition" /></a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Contact us</h2>
          <address className="not-italic space-y-2">
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              <span>357 W. Gray St. Utica, Pennsylvania 57867</span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhone />
              <span>(480) 555-0103</span>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope />
              <span>M.Alyaoquat@4house.Co</span>
            </p>
            <p className="flex items-center gap-2">
              <FaClock />
              <span>Sun - Sat | 10:00 AM - 8:00 PM</span>
            </p>
          </address>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Links</h2>
          <nav>
            <ul className="space-y-2">
              {['About us', 'Contact Us', 'Our Menu', 'Team', 'FAQ'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:underline block transition hover:text-gray-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Instagram Gallery */}
        <div className="hidden md:block">
          <h2 className="text-xl font-bold mb-4">Instagram Gallery</h2>
          <div className="grid grid-cols-3 gap-2">
            {instagramImages.map((image, index) => (
              <div key={index} className="w-full aspect-square bg-white rounded overflow-hidden">
                <Image
                  src={image}
                  alt={`Food ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                  width={100}
                  height={100}
                  placeholder="blur"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center text-sm mt-10 border-t border-white/20 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>Copyright © {new Date().getFullYear()}. All rights reserved</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline transition">Privacy Policy</a>
            <a href="#" className="hover:underline transition">Term of Use</a>
            <a href="#" className="hover:underline transition">Partner</a>
          </div>
        </div>
      </div>
    </footer>
  );
}