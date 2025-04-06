import React from 'react';

const GenreDetails = ({ genre }) => {
    if (!genre) return null;

    return (
        <div className="w-full p-4 bg-white shadow rounded-lg flex flex-col space-y-4">
            {/* Genre Image */}
            <div className="flex-shrink-0 mr-4">
                <img
                    src={`/art-images/genres/${genre.genreId}.jpg`}
                    alt={`${genre.genreName} Image`}
                    className="w-48 h-48 object-cover rounded shadow-lg"
                />
            </div>

            {/* Genre Information */}
            <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2">{genre.genreName}</h2>
                <p><strong>Description:</strong> {genre.description}</p>
                {genre.wikiLink && (
                    <p>
                        <strong>Wiki Link:</strong>
                        <a
                            href={genre.wikiLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline ml-1"
                        >
                            {genre.wikiLink}
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default GenreDetails;
