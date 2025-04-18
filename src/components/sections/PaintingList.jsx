/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// PaintingList.jsx
// This component renders a list of paintings with sorting options and handles painting selection

import React from 'react';

const PaintingList = ({ paintings, handlePaintingClick, sortBy, handleSortChange }) => {
    if (!paintings || paintings.length === 0) return <p className="text-center mt-4">No paintings to display.</p>;

    return (
        <div className="w-1/2 p-4 bg-white shadow rounded-lg ml-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Paintings</h2>

                {/* Sorting Controls */}
                <div className="flex items-center space-x-2">
                    <label htmlFor="sortSelect" className="text-xs font-bold text-gray-700">Sort By:</label>
                    <select
                        id="sortSelect"
                        onChange={handleSortChange}
                        value={sortBy}
                        className="text-xs border p-1 rounded w-min"
                    >
                        <option value="title">Title (A - Z)</option>
                        <option value="artist">Artist (A - Z)</option>
                        <option value="year">Year (Oldest to Newest)</option>
                    </select>
                </div>
            </div>

            {/* Paintings List Container */}
            <div className="overflow-y-auto max-h-[325px]">
                <ul>
                    {paintings.map(painting => (
                        <li
                            key={painting.paintingId}
                            onClick={() => handlePaintingClick(painting.paintingId)}
                            className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                        >
                            <img
                                src={`/art-images/paintings/square/${painting.imageFileName}.jpg`}
                                alt={painting.imageFileName}
                                className="w-20 h-20 object-cover rounded mr-4"
                            />
                            <div>
                                <p className="text-sm font-bold">{painting.title}</p>
                                <p className="text-gray-600 italic">{painting.yearOfWork}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PaintingList;
