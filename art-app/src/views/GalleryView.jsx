import React, { useEffect, useState, useMemo } from 'react';
import { fetchGalleries, fetchPaintingsByGallery } from '../services/galleryService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const GalleryView = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [showModal, setShowModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

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

  const handlePaintingClick = (painting) => {
    setSelectedPainting(painting);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-8 flex flex-col items-center">
        {/* Dropdown List */}
        <div className="mb-6">
          <label htmlFor="gallerySelect" className="block mb-2 font-bold text-gray-700">Select a Gallery to View Paintings</label>
          <select
            id="gallerySelect"
            className="border border-gray-300 rounded p-2 w-full mb-4"
            onChange={handleGalleryChange}
            defaultValue=""
          >
            <option value="" disabled>-- Choose a gallery from the list --</option>
            {galleries.map(gallery => (
              <option key={gallery.galleryId} value={gallery.galleryId}>
                {gallery.galleryName}
              </option>
            ))}
          </select>
        </div>

        {/* Render Both Left and Right Side Only When a Gallery is Selected */}
        {selectedGallery && (
          <div className="flex w-full justify-between mt-4">
            {/* Left Side Content */}
            <div className="w-1/2 p-4 bg-white shadow rounded-lg">
              <h2 className="text-2xl font-bold mb-4">{selectedGallery.galleryName}</h2>
              <p><strong>Native Name:</strong> {selectedGallery.galleryNativeName}</p>
              <p><strong>Address:</strong> {selectedGallery.galleryAddress}</p>
              <p><strong>City:</strong> {selectedGallery.galleryCity}</p>
              <p><strong>Country:</strong> {selectedGallery.galleryCountry}</p>
              <p><strong>Website:</strong>
                <a
                  href={selectedGallery.galleryWebSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline ml-1"
                >
                  {selectedGallery.galleryWebSite}
                </a>
              </p>

              {/* Display Map if Coordinates are Available */}
              {selectedGallery.latitude && selectedGallery.longitude && (
                <div className="mt-6">
                  <MapContainer
                    key={selectedGallery.galleryId}
                    center={[selectedGallery.latitude, selectedGallery.longitude]}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[selectedGallery.latitude, selectedGallery.longitude]}>
                      <Popup>
                        {selectedGallery.galleryName}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}
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
                    <option value="artist">Artist (A - Z)</option>
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
                        <p className="font-bold">{painting.artists?.firstName} {painting.artists?.lastName}</p>
                        <p className="text-gray-600 italic">{painting.title} ({painting.yearOfWork})</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      {/* Modal */}
      {showModal && selectedPainting && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
          onClick={() => setShowModal(false)}
        >
          {/* Instructional Messages (Top) */}
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

            {/* Text Information Section (Bottom) */}
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


    </div>
  );
}

export default GalleryView;
