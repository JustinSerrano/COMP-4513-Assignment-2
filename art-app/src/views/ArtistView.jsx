import React, { useEffect, useState, useMemo } from 'react';
import { fetchArtists, fetchPaintingsByArtist } from '../services/artistService';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import ArtistDetails from '../components/ArtistDetails';
import PaintingList from '../components/PaintingList';
import Footer from '../components/Footer';
import ArtistModal from '../components/ArtistModal';
import PaintingModal from '../components/PaintingModal';

const ArtistView = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [showArtistModal, setShowArtistModal] = useState(false);

  useEffect(() => {
    const getArtists = async () => {
      const data = await fetchArtists();
      setArtists(data);
    };

    getArtists();
  }, []);

  const handleArtistChange = async (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const artist = artists.find(a => a.artistId === selectedId);
    setSelectedArtist(artist);

    if (artist) {
      const paintingsData = await fetchPaintingsByArtist(artist.artistId);
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
      if (sortBy === 'title') return a.title.localeCompare(b.title);
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

      <main className="flex-grow p-8 flex flex-col items-center">
        {/* Dropdown List */}
        <Dropdown
          label="Select an Artist to View Paintings"
          options={artists.map(artist => ({ id: artist.artistId, name: `${artist.firstName} ${artist.lastName}` }))}
          onChange={handleArtistChange}
          value={selectedArtist?.artistId}
          placeholder="-- Choose an artist from the list --"
        />

        {/* Render Both Left and Right Side Only When an Artist is Selected */}
        {selectedArtist && (
          <div className="flex w-full justify-between mt-4">

            {/* Left Side Content */}
            <ArtistDetails
              artist={selectedArtist}
              showArtistModal={() => setShowArtistModal(true)}
            />

            {/* Right Side Content*/}
            <PaintingList
              paintings={sortedPaintings}
              handlePaintingClick={handlePaintingClick}
              sortBy={sortBy}
              handleSortChange={handleSortChange}
            />
          </div>
        )
        }
      </main >

      <Footer />
      <ArtistModal
        artist={selectedArtist}
        isOpen={showArtistModal}
        onClose={() => setShowArtistModal(false)}
      />

      <PaintingModal
        painting={selectedPainting}
        isOpen={showPaintingModal}
        onClose={() => setShowPaintingModal(false)}
      />
    </div >
  );
}

export default ArtistView;
