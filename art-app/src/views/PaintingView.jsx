import React, { useEffect, useState } from 'react';
import { fetchPaintings } from '../services/paintingService';

const PaintingView = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const getPaintings = async () => {
      const data = await fetchPaintings();
      setPaintings(data);
    };

    getPaintings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Paintings</h1>
      <ul>
        {paintings.map(painting => (
          <li key={painting.id} className="p-2 border-b border-gray-300">
            {painting.title} - {painting.yearOfWork}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaintingView;
