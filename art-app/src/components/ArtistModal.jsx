import React from 'react';

const ArtistModal = ({ artist, isOpen, onClose }) => {
    if (!isOpen || !artist) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={onClose}
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
                    src={`/art-images/artists/full/${artist.artistId}.jpg`}
                    alt={`${artist.firstName} ${artist.lastName}`}
                    className="w-full h-full object-contain rounded"
                />
            </div>

            {/* Instructional Message (Bottom) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
                Click outside the modal to close
            </div>
        </div>
    );
};

export default ArtistModal;
