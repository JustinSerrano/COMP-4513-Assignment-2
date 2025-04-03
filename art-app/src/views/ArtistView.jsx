import React, { useEffect, useState } from 'react';
import { fetchArtists } from '../services/artistService';

const ArtistView = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getArtists = async () => {
      const data = await fetchArtists();
      setArtists(data);
    };

    getArtists();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Artists</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id} className="p-2 border-b border-gray-300">{artist.firstName} {artist.lastName}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistView;
