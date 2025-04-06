import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const GalleryDetails = ({ gallery }) => {
    if (!gallery) return null;

    return (

        <div className="w-1/2 p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{gallery.galleryName}</h2>
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