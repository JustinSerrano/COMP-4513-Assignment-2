/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// GenreView.jsx
// This component serves as the main view for displaying genres and their paintings, allowing users to select a genre and view its artworks.

import React, { useEffect, useState, useMemo } from 'react';
import { fetchGenres, fetchPaintingsByGenre } from '../services/genreService';
import Header from '../components/layout/Header';
import Dropdown from '../components/sections/Dropdown';
import GenreDetails from '../components/sections/GenreDetails';
import PaintingList from '../components/sections/PaintingList';
import Footer from '../components/layout/Footer';
import PaintingModal from '../components/modals/PaintingModal';

const GenreView = ({ addFavorite, removeFavorite, favorites }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [selectedPaintingId, setSelectedPaintingId] = useState(false);

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };

    getGenres();
  }, []);

  const handleGenreChange = async (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const genre = genres.find(g => g.genreId === selectedId);
    setSelectedGenre(genre);

    if (genre) {
      const paintingsData = await fetchPaintingsByGenre(genre.genreId);
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

        <Dropdown
          label="Select a Genre to View Paintings"
          options={genres.map(genre => ({ id: genre.genreId, name: genre.genreName }))}
          onChange={handleGenreChange}
          value={selectedGenre?.genreId}
          placeholder="-- Choose a genre from the list --"
        />

        {/* Render Both Left and Right Side Only When an Artist is Selected */}
        {selectedGenre && (
          <div className="flex w-full justify-between mt-4">

            {/* Left Side Content */}
            <GenreDetails genre={selectedGenre} />

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

export default GenreView;
