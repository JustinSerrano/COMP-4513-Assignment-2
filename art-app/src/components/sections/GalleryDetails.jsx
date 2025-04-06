import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const GalleryDetails = ({ gallery, addFavorite, removeFavorite, favorites }) => {
    if (!gallery) return null;

    const isFavorite = favorites.galleries.includes(gallery.galleryName);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite('galleries', gallery.galleryName);
        } else {
            addFavorite('galleries', gallery.galleryName);
        }
    };

    return (
        <div className="w-1/2 p-4 bg-white shadow rounded-lg">
            {/* Gallery Title and Favorite Toggle */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{gallery.galleryName}</h2>
                <button
                    onClick={toggleFavorite}
                    className="focus:outline-none hover-effect"
                >
                    <FontAwesomeIcon
                        icon={faStar}
                        size="2x"
                        className={`star-icon ${isFavorite ? 'star-icon-active' : 'star-icon-inactive'}`}
                    />
                </button>
            </div>

            {/* Gallery Details */}
            <p><strong>Native Name:</strong> {gallery.galleryNativeName}</p>
            <p><strong>Address:</strong> {gallery.galleryAddress}</p>
            <p><strong>City:</strong> {gallery.galleryCity}</p>
            <p><strong>Country:</strong> {gallery.galleryCountry}</p>
            <p><strong>Website:</strong>
                <a
                    href={gallery.galleryWebSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline ml-1"
                >
                    {gallery.galleryWebSite}
                </a>
            </p>

            {/* Display Map if Coordinates are Available */}
            {gallery.latitude && gallery.longitude && (
                <div className="mt-6">
                    <MapContainer
                        key={gallery.galleryId}
                        center={[gallery.latitude, gallery.longitude]}
                        zoom={13}
                        style={{ height: "300px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[gallery.latitude, gallery.longitude]}>
                            <Popup>
                                {gallery.galleryName}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </div>)
};

export default GalleryDetails;