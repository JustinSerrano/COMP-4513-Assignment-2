/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// PaintingGrid.jsx
// This component renders a grid of paintings with sorting options and a click event handler for each painting

import React from 'react';

const PaintingGrid = ({
    paintings,
    onPaintingClick,
    sortBy,
    handleSortChange
}) => {
    if (!paintings || paintings.length === 0) return <p className="text-center mt-4">No paintings to display.</p>;

    return (
        <div className="p-4 bg-white shadow rounded-lg overflow-y-auto max-h-[700px]">

            {/* Sorting Controls */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Paintings</h2>
                <div className="flex items-center space-x-2">
                    <label htmlFor="sortSelect" className="font-bold text-gray-700">Sort By:</label>
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

            {/* Paintings Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 overflow-y-auto max-h-[275px]">
                {paintings.map(painting => (
                    <div
                        key={painting.paintingId}
                        onClick={() => onPaintingClick(painting.paintingId)}
                        className="cursor-pointer p-2 hover:bg-gray-100 flex flex-col items-center"
                    >
                        <img
                            src={`/art-images/paintings/square/${painting.imageFileName}.jpg`}
                            alt={painting.imageFileName}
                            className="w-[100px] h-[100px] object-cover rounded mb-2"
                        />
                        <div className="text-center">
                            <p className="text-sm font-bold">{painting.title}</p>
                            <p className="text-sm text-gray-600 italic">
                                {painting.artists?.firstName} {painting.artists?.lastName} ({painting.yearOfWork})
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaintingGrid;
