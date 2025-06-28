'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaPlus } from 'react-icons/fa';
import CategoryModal from './Modals/CategoryModal';
import FoodModal from './Modals/FoodModal';

export default function FoodContainer() {
    // State for data and UI
    const [foodItems, setFoodItems] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showMobileCategories, setShowMobileCategories] = useState(false);

    // Fetch data using Promise.all
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const [categoriesResponse, foodsResponse] = await Promise.all([
                    fetch('/api/category'),
                    fetch('/api/foods')
                ]);

                if (!categoriesResponse.ok || !foodsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [categoriesData, foodsData] = await Promise.all([
                    categoriesResponse.json(),
                    foodsResponse.json()
                ]);

                setCategories(['All', ...categoriesData.map(c => c.name)]);
                setFoodItems(foodsData);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle food form submission
    const handleFoodSubmit = async (foodData) => {
        try {
            const response = await fetch('/api/foods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodData),
            });

            if (!response.ok) {
                throw new Error('Failed to add food item');
            }

            const newFood = await response.json();
            setFoodItems(prev => [...prev, newFood]);
            setShowFoodModal(false);
        } catch (error) {
            console.error('Error adding food:', error);
            alert('Error adding food item: ' + error.message);
        }
    };

    // Handle category form submission
    const handleCategorySubmit = async (categoryData) => {
        try {
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            const newCategory = await response.json();
            setCategories(prev => [...prev, newCategory.name]);
            setShowCategoryModal(false);
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Error adding category: ' + error.message);
        }
    };

    const filteredItems = activeCategory === 'All'
        ? foodItems
        : foodItems.filter(item => item.category === activeCategory);

    const StarRating = () => (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" size={14} />
            ))}
        </div>
    );

    if (loading) {
        return (
            <div className="max-w-[1299px] mx-auto p-4 md:p-5 text-center">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 md:h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 md:h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-xl h-[300px] md:h-[486px]"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-[1299px] mx-auto p-4 md:p-5 mt-28'>
            {/* Header Section */}
            <div className='mb-8 md:mb-12 text-center'>
                <h1 className='font-poppins font-bold text-2xl md:text-4xl lg:text-[55px] leading-[120%] mb-2 md:mb-4'>
                    Our Best Seller Dishes
                </h1>
                <p className='font-poppins text-sm md:text-lg lg:text-[25px] leading-[120%] max-w-4xl mx-auto'>
                    Our fresh garden salad is a light and refreshing option.
                </p>
            </div>

            <div className='flex md:flex-row flex-col gap-2 md:justify-between mb-6 md:mb-8'>
                {/* Mobile Category Toggle */}
                <div className='md:hidden flex justify-between items-center'>
                    <button
                        onClick={() => setShowMobileCategories(!showMobileCategories)}
                        className='w-full text-left bg-gray-100 rounded-[45px] px-4 py-3 font-medium flex justify-between items-center'
                    >
                        <span>{activeCategory}</span>
                        <span className='transform transition-transform'>
                            {showMobileCategories ? '▲' : '▼'}
                        </span>
                    </button>
                </div>

                {/* Categories Filter - Mobile Dropdown */}
                {showMobileCategories && (
                    <ul className='md:hidden bg-white shadow-lg rounded-lg p-2 z-10'>
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={`px-4 py-2 cursor-pointer transition-colors uppercase
                                    ${activeCategory === category ? 'bg-[#2C2C2C] text-white' : 'hover:bg-gray-100'}`}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setShowMobileCategories(false);
                                }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Categories Filter - Desktop */}
                <div className='hidden md:block'>
                    <ul className='flex flex-wrap gap-2 md:gap-4 lg:gap-8 overflow-x-auto pb-2'>
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={`font-medium text-sm md:text-lg cursor-pointer transition-colors uppercase whitespace-nowrap
                                    rounded-[45px] px-4 py-2 md:px-[30px] md:py-[15px] 
                                    ${activeCategory === category
                                        ? 'text-white bg-[#2C2C2C] font-semibold'
                                        : 'text-gray-600 bg-gray-100 hover:text-white hover:bg-[#3d3d3d]'}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-2 md:gap-4 w-full sm:w-auto'>
                    <button
                        onClick={() => setShowFoodModal(true)}
                        className='w-full sm:w-[180px] md:w-[200px] h-12 md:h-[60px] text-white rounded-[45px] px-4 md:px-6 py-2 bg-[#2C2C2C] hover:bg-[#3d3d3d] transition-colors flex items-center justify-center gap-2'
                    >
                        <FaPlus size={14} />
                        <span className='font-medium text-sm md:text-base'>Add Food</span>
                    </button>
                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className='w-full sm:w-[180px] md:w-[200px] h-12 md:h-[60px] text-white rounded-[45px] px-4 md:px-6 py-2 bg-[#2C2C2C] hover:bg-[#3d3d3d] transition-colors flex items-center justify-center gap-2'
                    >
                        <FaPlus size={14} />
                        <span className='font-medium text-sm md:text-base'>Add Category</span>
                    </button>
                </div>
            </div>

            {/* Food Items Grid */}
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
                {filteredItems?.length > 0 ? (
                    filteredItems?.map((item) => (
                        <div key={item._id || item.id} className='bg-gray-50 rounded-xl overflow-hidden w-full h-[200px] md:h-[486px] flex flex-col shadow-md hover:shadow-lg transition-shadow'>
                            <div className='relative h-[150px] md:h-[350px]'>
                                <Image
                                    src={item?.image?.filePath || '/food-placeholder.jpg'}
                                    alt={item?.name}
                                    fill
                                    className='object-cover'
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className='p-4 md:p-6 flex-grow flex flex-col'>
                                <div className='flex justify-between items-center mb-1 md:mb-2'>
                                    <h3 className='font-poppins font-bold text-sm md:text-xl'>{item?.name}</h3>
                                    <span className='font-poppins font-bold text-xs md:text-sm text-white px-2 py-1 bg-red-600 rounded-full'>
                                        {item?.category}
                                    </span>
                                </div>
                                <p className='text-gray-600 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2'>
                                    {item?.description || 'Delicious food item'}
                                </p>
                                <div className='mt-auto flex justify-between items-center'>
                                    <StarRating />
                                    <span className='font-bold text-sm md:text-lg'>${item?.price?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full text-center py-8 md:py-12'>
                        <p className='text-gray-500 text-base md:text-xl'>No items found in this category</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showFoodModal && (
                <FoodModal
                    onClose={() => setShowFoodModal(false)}
                    onSubmit={handleFoodSubmit}
                    categories={categories.filter(c => c !== 'All')}
                />
            )}

            {showCategoryModal && (
                <CategoryModal
                    onClose={() => setShowCategoryModal(false)}
                    onSubmit={handleCategorySubmit}
                />
            )}
        </div>
    );
}