import React, { useState } from 'react';

const CategoryModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                <h2 className="text-lg text-black font-semibold mb-4 text-center">Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black placeholder-gray-800"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <textarea
                            name="description"
                            placeholder="Description (optional)"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-800"
                        />
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

export default CategoryModal;