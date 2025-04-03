import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../services/genreService';

const GenreView = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };

    getGenres();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Genres</h1>
      <ul>
        {genres.map(genre => (
          <li key={genre.id} className="p-2 border-b border-gray-300">{genre.genreName}</li>
        ))}
      </ul>
    </div>
  );
}

export default GenreView;
