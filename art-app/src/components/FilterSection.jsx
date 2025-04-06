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
        <div className="p-4 bg-white shadow rounded-lg mb-6 w-[700px] mx-auto space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Filters</h2>

            {/* Radio Buttons */}
            <div className="flex justify-center space-x-4 mb-4">
                <label><input type="radio" name="filter" value="title" checked={filterBy === 'title'} onChange={handleFilterChange} /> Title</label>
                <label><input type="radio" name="filter" value="artist" checked={filterBy === 'artist'} onChange={handleFilterChange} /> Artist</label>
                <label><input type="radio" name="filter" value="gallery" checked={filterBy === 'gallery'} onChange={handleFilterChange} /> Gallery</label>
                <label><input type="radio" name="filter" value="year" checked={filterBy === 'year'} onChange={handleFilterChange} /> Year</label>
            </div>

            {/* Filter Inputs */}
            <div className="flex items-center space-x-2 justify-center">
                {filterBy === 'title' && (
                    <input
                        type="text"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        placeholder="Search by Title"
                        className="w-full p-2 border rounded"
                    />
                )}

                {filterBy === 'artist' && (
                    <select value={filterValue || ''} onChange={handleFilterValueChange} className="w-auto p-2 border rounded justify-center">
                        <option value="" disabled>Select Artist</option>
                        {artists.map(artist => (
                            <option key={artist.artistId} value={artist.artistId}>
                                {artist.firstName} {artist.lastName}
                            </option>
                        ))}
                    </select>
                )}

                {filterBy === 'gallery' && (
                    <select value={filterValue || ''} onChange={handleFilterValueChange} className="w-auto p-2 border rounded justify-center">
                        <option value="" disabled>Select Gallery</option>
                        {galleries.map(gallery => (
                            <option key={gallery.galleryId} value={gallery.galleryId}>{gallery.galleryName}</option>
                        ))}
                    </select>
                )}

                {filterBy === 'year' && (
                    <div className="flex items-center space-x-2 justify-center">
                        <input
                            type="number"
                            value={yearRange[0]}
                            onChange={(e) => handleYearChange('min', e.target.value)}
                            className="p-2 border rounded w-24"
                            placeholder="Min Year"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            value={yearRange[1]}
                            onChange={(e) => handleYearChange('max', e.target.value)}
                            className="p-2 border rounded w-24"
                            placeholder="Max Year"
                        />
                    </div>
                )}
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
                <button onClick={handleClear} className="bg-gray-500 text-white px-4 py-2 rounded">Clear</button>
                <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
            </div>
        </div>
    );
};

export default FilterSection;
