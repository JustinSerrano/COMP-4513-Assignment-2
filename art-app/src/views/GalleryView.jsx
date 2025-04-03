import React, { useEffect, useState } from 'react';
import { fetchGalleries } from '../services/galleryService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const GalleryView = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    const getGalleries = async () => {
      const data = await fetchGalleries();
      setGalleries(data);
    };

    getGalleries();
  }, []);

  const handleGalleryChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const gallery = galleries.find(g => g.galleryId === selectedId);
    setSelectedGallery(gallery);
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

        <div className="flex w-full justify-between mt-4">
          {/* Left Side Content */}
          {selectedGallery && (
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
          )}

          {/* Placeholder for the Right Side */}
          <div className="w-1/2 p-4 bg-gray-100 shadow rounded-lg ml-4">
            <p>This section will be implemented later.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GalleryView;
