import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ArtistDetails = ({ artist, showArtistModal, addFavorite, removeFavorite, favorites }) => {
    if (!artist) return null;

    const isFavorite = favorites.artists.includes(artist.firstName + ' ' + artist.lastName);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite('artists', artist.firstName + ' ' + artist.lastName);
        } else {
            addFavorite('artists', artist.firstName + ' ' + artist.lastName);
        }
    };

    return (
        <div className="w-full p-4 bg-white shadow rounded-lg flex flex-col">
            <div className="flex mb-4">
                {/* Artist Image */}
                <div
                    className="flex-shrink-0 mr-4 cursor-pointer transform hover-effect"
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
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{artist.firstName} {artist.lastName}</h2>
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
