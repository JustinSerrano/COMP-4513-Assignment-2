import React, { useEffect, useState, useMemo } from 'react';
import { fetchGalleries, fetchPaintingsByGallery } from '../services/galleryService';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import GalleryDetails from '../components/GalleryDetails';
import PaintingList from '../components/PaintingList';
import Footer from '../components/Footer';
import PaintingModal from '../components/PaintingModal';

const GalleryView = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [selectedPaintingId, setSelectedPaintingId] = useState(false);

  useEffect(() => {
    const getGalleries = async () => {
      const data = await fetchGalleries();
      setGalleries(data);
    };

    getGalleries();
  }, []);

  const handleGalleryChange = async (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const gallery = galleries.find(g => g.galleryId === selectedId);
    setSelectedGallery(gallery);

    if (gallery) {
      const paintingsData = await fetchPaintingsByGallery(gallery.galleryId);
      setPaintings(paintingsData);
    } else {
      setPaintings([]);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedPaintings = useMemo(() => {
    return [...paintings].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'artist') {
        const artistA = `${a.artists.firstName} ${a.artists.lastName}`;
        const artistB = `${b.artists.firstName} ${b.artists.lastName}`;
        return artistA.localeCompare(artistB);
      }
      if (sortBy === 'year') {
        return (a.yearOfWork || 0) - (b.yearOfWork || 0);
      }
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

      <main className="flex-grow p-8 flex flex-col items-center">
        {/* Dropdown List */}
        <Dropdown
          label="Select a Gallery to View Paintings"
          options={galleries.map(gallery => ({ id: gallery.galleryId, name: gallery.galleryName }))}
          onChange={handleGalleryChange}
          value={selectedGallery?.galleryId}
          placeholder="-- Choose a gallery from the list --"
        />

        {/* Render Both Left and Right Side Only When a Gallery is Selected */}
        {selectedGallery && (
          <div className="flex w-full justify-between mt-4">
            
            {/* Left Side Content */}
            <GalleryDetails gallery={selectedGallery} />

            {/* Right Side Content*/}
            <PaintingList
              paintings={sortedPaintings}
              handlePaintingClick={handlePaintingClick}
              sortBy={sortBy}
              handleSortChange={handleSortChange}
            />
          </div>
        )}
      </main>

      <Footer />
      <PaintingModal
        paintingId={selectedPaintingId}
        isOpen={showPaintingModal}
        onClose={() => setShowPaintingModal(false)}
      />


    </div>
  );
}

export default GalleryView;
