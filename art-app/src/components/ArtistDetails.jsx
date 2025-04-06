import React from 'react';

const ArtistDetails = ({ artist, showArtistModal }) => {
    if (!artist) return null;

    return (
        <div className="w-full p-4 bg-white shadow rounded-lg flex flex-col">
            <div className="flex mb-4">
                {/* Artist Image */}
                <div
                    className="flex-shrink-0 mr-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onClick={showArtistModal}
                >
                    <img
                        src={`/art-images/artists/square/${artist.artistId}.jpg`}
                        alt={`${artist.firstName} ${artist.lastName}`}
                        className="w-48 h-48 object-cover rounded shadow-lg"
                    />
                </div>

                {/* Artist Information */}
                <div className="flex-grow">
                    <div className="flex flex-col justify-start space-y-2">
                        <h2 className="text-2xl font-bold">{artist.firstName} {artist.lastName}</h2>
                        <p><strong>Nationality:</strong> {artist.nationality}</p>
                        <p><strong>Gender:</strong> {artist.gender}</p>
                        <p><strong>Born:</strong> {artist.yearOfBirth}</p>
                        <p><strong>Died:</strong> {artist.yearOfDeath ? artist.yearOfDeath : 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Additional Details */}
            <div className="mt-4 space-y-2">
                <p><strong>Details:</strong> {artist.details}</p>
                <p><strong>Website:</strong>
                    <a
                        href={artist.artistLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline ml-1"
                    >
                        {artist.artistLink}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ArtistDetails;
