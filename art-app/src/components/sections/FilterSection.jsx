/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// FilterSection.jsx
// This component renders a filter section with radio buttons for filtering by title, artist, gallery, or year

import React from 'react';

const FilterSection = ({
    filterBy,
    handleFilterChange,
    handleFilterValueChange,
    filterValue,
    artists,
    galleries,
    yearRange,
    handleYearChange,
    handleClear,
    handleFilter
}) => {
    return (
        <div className="p-3 bg-white shadow rounded-lg mb-4 w-[525px] mx-auto space-y-3">
            <h2 className="text-lg font-bold mb-2 text-center">Filters</h2>

            {/* Radio Buttons (Original horizontal layout) */}
            <div className="flex justify-center space-x-3 mb-2">
                <label className="text-xs">
                    <input type="radio" name="filter" value="title" checked={filterBy === 'title'} onChange={handleFilterChange} /> Title
                </label>
                <label className="text-xs">
                    <input type="radio" name="filter" value="artist" checked={filterBy === 'artist'} onChange={handleFilterChange} /> Artist
                </label>
                <label className="text-xs">
                    <input type="radio" name="filter" value="gallery" checked={filterBy === 'gallery'} onChange={handleFilterChange} /> Gallery
                </label>
                <label className="text-xs">
                    <input type="radio" name="filter" value="year" checked={filterBy === 'year'} onChange={handleFilterChange} /> Year
                </label>
            </div>

            {/* Filter Inputs */}
            <div className="flex items-center space-x-2 justify-center">
                {filterBy === 'title' && (
                    <input
                        type="text"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        placeholder="Search by Title"
                        className="w-50 p-1 border rounded text-xs"
                    />
                )}

                {filterBy === 'artist' && (
                    <select value={filterValue || ''} onChange={handleFilterValueChange} className="w-min p-1 border rounded text-xs">
                        <option value="" disabled>Select Artist</option>
                        {artists.map(artist => (
                            <option key={artist.artistId} value={artist.artistId}>
                                {artist.firstName} {artist.lastName}
                            </option>
                        ))}
                    </select>
                )}

                {filterBy === 'gallery' && (
                    <select value={filterValue || ''} onChange={handleFilterValueChange} className="w-min p-1 border rounded text-xs">
                        <option value="" disabled>Select Gallery</option>
                        {galleries.map(gallery => (
                            <option key={gallery.galleryId} value={gallery.galleryId}>{gallery.galleryName}</option>
                        ))}
                    </select>
                )}

                {filterBy === 'year' && (
                    <div className="flex items-center space-x-1 justify-center">
                        <input
                            type="number"
                            value={yearRange[0]}
                            onChange={(e) => handleYearChange('min', e.target.value)}
                            className="p-1 border rounded w-20 text-xs"
                            placeholder="Min Year"
                        />
                        <span className="text-xs">to</span>
                        <input
                            type="number"
                            value={yearRange[1]}
                            onChange={(e) => handleYearChange('max', e.target.value)}
                            className="p-1 border rounded w-20 text-xs"
                            placeholder="Max Year"
                        />
                    </div>
                )}
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center space-x-3 mt-3">
                <button onClick={handleClear} className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 transition">Clear</button>
                <button onClick={handleFilter} className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition">Filter</button>
            </div>
        </div>
    );
};

export default FilterSection;
