import React from 'react';
import Modal from 'react-modal';

// Bind modal to your app element
Modal.setAppElement('#root');

const ArtistModal = ({ artist, isOpen, onClose }) => {
    if (!isOpen || !artist) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Artist Image"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            className="relative max-w-[100vw] max-h-[120vh] p-4 rounded-lg"
        >
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
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-80 text-white text-sm text-center">
                Click outside the modal to close
            </div>
        </Modal>
    );
};

export default ArtistModal;
