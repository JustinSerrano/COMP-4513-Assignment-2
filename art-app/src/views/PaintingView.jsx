import React, { useState, useEffect, useMemo } from 'react';
import { fetchArtists, fetchGalleries, fetchPaintingsByFilter } from '../services/paintingService';
import Header from '../components/Header';
import FilterSection from '../components/FilterSection';
import PaintingGrid from '../components/PaintingGrid';
import Footer from '../components/Footer';
import PaintingModal from '../components/PaintingModal';

const PaintingsView = () => {
  const [filterBy, setFilterBy] = useState('year');
  const [artists, setArtists] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [yearRange, setYearRange] = useState([1500, 2025]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [sortBy, setSortBy] = useState('title');
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

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


  const handlePaintingClick = (painting) => {
    setSelectedPainting(painting);
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
        painting={selectedPainting}
        isOpen={showPaintingModal}
        onClose={() => setShowPaintingModal(false)}
      />
    </div >
  );
}

export default PaintingsView;
