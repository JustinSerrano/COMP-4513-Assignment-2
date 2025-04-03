import React, { useEffect, useState } from 'react';
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

  const sortedPaintings = [...paintings].sort((a, b) => {
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
          <select
            className="border border-gray-300 rounded p-2"
            onChange={handleGalleryChange}
            defaultValue=""
          >
            <option value="" disabled>Select a Gallery</option>
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
                <select onChange={handleSortChange} value={sortBy} className="border p-2 rounded">
                  <option value="title">Title</option>
                  <option value="artist">Artist</option>
                  <option value="year">Year</option>
                </select>
              </div>

              <ul>
                {sortedPaintings.map(painting => (
                  <li
                    key={painting.paintingId}
                    onClick={() => handlePaintingClick(painting)}
                    className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                  >
                    <img
                      src={`/art-images/paintings/square/${painting.imageFileName}.jpg`}
                      alt={painting.title}
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
        )}
      </main>

      <Footer />
      {/* Modal */}
      {showModal && selectedPainting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">{selectedPainting.title}</h2>
            <img
              src={`/art-images/paintings/full/${selectedPainting.imageFileName}.jpg`}
              alt={selectedPainting.title}
              className="w-full mb-4 rounded"
            />
            <p><strong>Artist:</strong> {selectedPainting.artists?.firstName} {selectedPainting.artists?.lastName}</p>
            <p><strong>Year:</strong> {selectedPainting.yearOfWork}</p>
            <p><strong>Description:</strong> {selectedPainting.description}</p>
            <button onClick={() => setShowModal(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryView;
