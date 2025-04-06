import React from 'react';

const PaintingModal = ({ painting, isOpen, onClose }) => {
    if (!isOpen || !painting) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
            onClick={onClose}
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
                        src={`/art-images/paintings/full/${painting.imageFileName}.jpg`}
                        alt={painting.title}
                        className="max-w-[400px] max-h-[70vh] object-contain rounded shadow-lg"
                    />
                </div>

                {/* Text Information Section */}
                <div className="flex-grow">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">{painting.title}</h2>
                    <p className="text-lg mb-2"><strong>Artist:</strong> {painting.artists?.firstName} {painting.artists?.lastName}</p>
                    <p className="text-lg mb-2"><strong>Year:</strong> {painting.yearOfWork}</p>
                    <p className="text-gray-700 mb-4"><strong>Description:</strong> {painting.description}</p>
                </div>
            </div>

            {/* Instructional Message (Bottom) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
                Click outside the modal to close
            </div>
        </div>
    );
};

export default PaintingModal;
