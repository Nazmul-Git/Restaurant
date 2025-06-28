import React, { useState } from 'react';

const FoodModal = ({ onClose, onSubmit, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: null
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div 
                className="bg-[#FFFFFF2E] p-6 rounded-xl shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4 text-center">Add Food Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Food Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-black bg-white/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-text-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.filter(c => c !== 'All').map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-black bg-white/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-text-black"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-black">Food Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-black text-sm"
                            required
                        />
                        {previewImage && (
                            <div className="mt-2">
                                <img 
                                    src={previewImage} 
                                    alt="Preview" 
                                    className="h-32 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-md transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodModal;