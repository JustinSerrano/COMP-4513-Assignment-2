/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// PaintingView.jsx
// This component serves as the main view for displaying paintings, allowing users to filter and sort artworks based on various criteria.

import React, { useState, useEffect, useMemo } from 'react';
import { fetchArtists, fetchGalleries, fetchPaintingsByFilter } from '../services/paintingService';
import Header from '../components/layout/Header';
import FilterSection from '../components/sections/FilterSection';
import PaintingGrid from '../components/sections/PaintingGrid';
import Footer from '../components/layout/Footer';
import PaintingModal from '../components/modals/PaintingModal';

const PaintingsView = ({ addFavorite, removeFavorite, favorites }) => {
  const [filterBy, setFilterBy] = useState('year');
  const [artists, setArtists] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [yearRange, setYearRange] = useState([1500, 2025]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [sortBy, setSortBy] = useState('title');
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [selectedPaintingId, setSelectedPaintingId] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const artistData = await fetchArtists();
      const galleryData = await fetchGalleries();
      setArtists(artistData);
      setGalleries(galleryData);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => setFilterBy(e.target.value);
  const handleFilterValueChange = (e) => setFilterValue(e.target.value);
  const handleYearChange = (type, value) => {
    const parsedValue = parseInt(value, 10) || (type === 'min' ? 1500 : 2025);

    if (type === 'min') {
      setYearRange([parsedValue, yearRange[1]]);
    } else if (type === 'max') {
      setYearRange([yearRange[0], parsedValue]);
    }
  };

  const handleClear = () => {
    setFilterValue('');
    setYearRange([1500, 2025]);
    setPaintings([]);
    setSelectedFilter(null);
  };

  const handleFilter = async () => {
    if (filterBy === 'title' && (!filterValue || filterValue.trim() === '')) {
      // Clear the paintings list if the input is empty or only contains white spaces
      setPaintings([]);
      setSelectedFilter(null);
      return;
    }

    const filteredPaintings = await fetchPaintingsByFilter(filterBy, filterValue, yearRange);
    setPaintings(filteredPaintings);
    setSelectedFilter(filterBy);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedPaintings = useMemo(() => {
    return [...paintings].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'artist') return `${a.artists.firstName} ${a.artists.lastName}`.localeCompare(`${b.artists.firstName} ${b.artists.lastName}`);
      if (sortBy === 'year') return (a.yearOfWork || 0) - (b.yearOfWork || 0);
      return 0;
    });
  }, [paintings, sortBy]);


  const handlePaintingClick = (paintingId) => {
    setSelectedPaintingId(paintingId);
    setShowPaintingModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-8 flex flex-col space-y-6">

        {/* Top Side Content*/}
        <FilterSection
          filterBy={filterBy}
          handleFilterChange={handleFilterChange}
          handleFilterValueChange={handleFilterValueChange}
          filterValue={filterValue}
          artists={artists}
          galleries={galleries}
          yearRange={yearRange}
          handleYearChange={handleYearChange}
          handleClear={handleClear}
          handleFilter={handleFilter}
        />

        {/* Bottom Side Content*/}
        {selectedFilter && (
          <PaintingGrid
            paintings={sortedPaintings}
            onPaintingClick={handlePaintingClick}
            sortBy={sortBy}
            handleSortChange={handleSortChange}
          />
        )}
      </main >

      <Footer />
      <PaintingModal
        paintingId={selectedPaintingId}
        isOpen={showPaintingModal}
        onClose={() => setShowPaintingModal(false)}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        favorites={favorites}
      />
    </div >
  );
}

export default PaintingsView;
