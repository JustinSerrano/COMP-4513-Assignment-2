import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { fetchPaintingDetails } from '../services/paintingService';

// Bind modal to your app element
Modal.setAppElement('#root');

const PaintingModal = ({ paintingId, isOpen, onClose }) => {
    const [painting, setPainting] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (paintingId) {
                setLoading(true);
                const fetchedPainting = await fetchPaintingDetails(paintingId);
                setPainting(fetchedPainting);
                setLoading(false);
            }
        };

        fetchData();
    }, [paintingId]);

    if (!isOpen || !painting) return null;

    // Parse JSON Annotations if available
    const annotations = painting.jsonAnnotations ? JSON.parse(painting.jsonAnnotations) : null;
    const dominantColors = annotations?.dominantColors || [];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Painting Details"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto"
        >
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    {/* Instructional Messages (Top) */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
                        Click outside the modal to close
                    </div>

                    <div className="flex space-x-6" onClick={(e) => e.stopPropagation()}>
                        {/* Image Section */}
                        <div className="flex-shrink-0">
                            <img
                                src={`/art-images/paintings/full/${painting.imageFileName}.jpg`}
                                alt={painting.title}
                                className="max-w-[400px] max-h-[70vh] object-contain rounded shadow-lg"
                            />
                        </div>

                        {/* Text Information Section */}
                        <div className="flex-grow space-y-4">
                            <h2 className="text-3xl font-bold text-gray-800">{painting.title}</h2>
                            <p className="text-lg"><strong>Artist:</strong> {painting.artists?.firstName} {painting.artists?.lastName}</p>
                            <p className="text-lg"><strong>Medium:</strong> {painting.medium || 'Not specified'}</p>
                            <p className="text-lg"><strong>Dimensions:</strong> {painting.width && painting.height ? `${painting.width} x ${painting.height} cm` : 'Dimensions not available'}</p>
                            <p className="text-lg"><strong>Gallery:</strong>
                                {painting.museumLink ? (
                                    <a
                                        href={painting.museumLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline ml-1"
                                    >
                                        {painting.galleries?.galleryName || 'Unknown Gallery'}, {painting.galleries?.galleryCity || 'Unknown City'}
                                    </a>
                                ) : (
                                    `${painting.galleries?.galleryName || 'Unknown Gallery'}, ${painting.galleries?.galleryCity || 'Unknown City'}`
                                )}
                            </p>
                            <p className="text-lg"><strong>Wiki Link:</strong>
                                {painting.wikiLink ? (
                                    <a
                                        href={painting.wikiLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline ml-1"
                                    >Here</a>
                                ) : (
                                    ' Unavailable'
                                )}
                            </p>
                            <p className="text-gray-700"><strong>Description:</strong> {painting.description || 'No description provided.'}</p>

                            {painting.copyrightText && (
                                <p className="text-sm text-gray-500 mt-4"><strong>Copyright Notice:</strong> {painting.copyrightText}</p>
                            )}

                            {/* Display Dominant Colors */}
                            {dominantColors.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-bold text-lg mb-2">Dominant Colors</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {dominantColors.map((colorObj, index) => (
                                            <div
                                                key={index}
                                                style={{ backgroundColor: colorObj.web }}
                                                className="w-8 h-8 rounded border relative group cursor-pointer"
                                            >
                                                <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {colorObj.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Instructional Message (Bottom) */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-80 px-4 py-2 rounded shadow-lg">
                        Click outside the modal to close
                    </div>
                </>
            )}
        </Modal>
    );
};

export default PaintingModal;
