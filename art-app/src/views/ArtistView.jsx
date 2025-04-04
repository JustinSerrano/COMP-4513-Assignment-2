import React, { useEffect, useState, useMemo } from 'react';
import { fetchArtists, fetchPaintingsByArtist } from '../services/artistService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ArtistView = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

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
        <div className="mb-6">
          <label htmlFor="artistSelect" className="block mb-2 font-bold text-gray-700">Select an Artist to View Paintings</label>
          <select
            className="border border-gray-300 rounded p-2 w-full mb-4"
            onChange={handleArtistChange}
            defaultValue=""
          >
            <option value="" disabled>-- Choose an artist from the list --</option>
            {artists.map(artist => (
              <option key={artist.artistId} value={artist.artistId}>
                {artist.firstName} {artist.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Render Both Left and Right Side Only When an Artist is Selected */}
        {selectedArtist && (
          <div className="flex w-full justify-between mt-4">
            {/* Left Side Content */}
            <div className="w-1/2 p-4 bg-white shadow rounded-lg flex flex-col">
              <div className="flex mb-4">
                {/* Artist Image */}
                <div
                  className="flex-shrink-0 mr-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => setShowImageModal(true)}
                >
                  <img
                    src={`/art-images/artists/square/${selectedArtist.artistId}.jpg`}
                    alt={`${selectedArtist.firstName} ${selectedArtist.lastName}`}
                    className="w-48 h-48 object-cover rounded shadow-lg"
                  />
                </div>

                {/* Artist Information */}
                <div className="flex-grow">
                  <div className="flex flex-col justify-start space-y-2">
                    <h2 className="text-2xl font-bold">{selectedArtist.firstName} {selectedArtist.lastName}</h2>
                    <p><strong>Nationality:</strong> {selectedArtist.nationality}</p>
                    <p><strong>Gender:</strong> {selectedArtist.gender}</p>
                    <p><strong>Born:</strong> {selectedArtist.yearOfBirth}</p>
                    <p><strong>Died:</strong> {selectedArtist.yearOfDeath ? selectedArtist.yearOfDeath : 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p><strong>Details:</strong> {selectedArtist.details}</p>
                <p><strong>Website:</strong>
                  <a
                    href={selectedArtist.artistLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline ml-1"
                  >
                    {selectedArtist.artistLink}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Side Content*/}
            <div className="w-1/2 p-4 bg-white shadow rounded-lg ml-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Paintings</h2>

                {/* Sorting Controls */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="sortSelect" className="font-bold text-gray-700">Sort By:</label>
                  <select
                    id="sortSelect"
                    onChange={handleSortChange}
                    value={sortBy}
                    className="border p-1 rounded w-48"
                  >
                    <option value="title">Title (A - Z)</option>
                    <option value="year">Year (Oldest to Newest)</option>
                  </select>
                </div>
              </div>

              {/* Paintings List Container */}
              <div className="overflow-y-auto max-h-[575px]">
                <ul>
                  {sortedPaintings.map(painting => (
                    <li
                      key={painting.paintingId}
                      onClick={() => handlePaintingClick(painting)}
                      className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                    >
                      <img
                        src={`/art-images/paintings/square/${painting.imageFileName}.jpg`}
                        alt={painting.imageFileName}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div>
                        <p className="font-bold">{painting.title}</p>
                        <p className="text-gray-600 italic">{painting.yearOfWork}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
        }
      </main >

      <Footer />
      {/* Full Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          {/* Instructional Messages (Top) */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
            Click outside the modal to close
          </div>

          <div
            className="relative max-w-[100vw] max-h-[120vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/art-images/artists/full/${selectedArtist.artistId}.jpg`}
              alt={`${selectedArtist.firstName} ${selectedArtist.lastName}`}
              className="w-full h-full object-contain rounded"
            />
          </div>
          {/* Instructional Message (Bottom) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
            Click outside the modal to close
          </div>
        </div>
      )}

      {/* Painting Modal */}
      {showPaintingModal && selectedPainting && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
          onClick={() => setShowPaintingModal(false)}
        >
          {/* Instructional Messages */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
            Click outside the modal to close
          </div>

          <div
            className="relative bg-white p-8 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto flex space-x-6 transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="flex-shrink-0">
              <img
                src={`/art-images/paintings/full/${selectedPainting.imageFileName}.jpg`}
                alt={selectedPainting.title}
                className="max-w-[400px] max-h-[70vh] object-contain rounded shadow-lg"
              />
            </div>

            {/* Text Information Section */}
            <div className="flex-grow">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedPainting.title}</h2>
              <p className="text-lg mb-2"><strong>Artist:</strong> {selectedPainting.artists?.firstName} {selectedPainting.artists?.lastName}</p>
              <p className="text-lg mb-2"><strong>Year:</strong> {selectedPainting.yearOfWork}</p>
              <p className="text-gray-700 mb-4"><strong>Description:</strong> {selectedPainting.description}</p>
            </div>
          </div>

          {/* Instructional Message (Bottom) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
            Click outside the modal to close
          </div>
        </div>
      )}
    </div >
  );
}

export default ArtistView;
