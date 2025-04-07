/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// App.jsx
// This component serves as the main entry point for the application, setting up routing and managing the state of favorites.
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import GalleryView from "./views/GalleryView";
import ArtistView from "./views/ArtistView";
import GenreView from "./views/GenreView";
import PaintingView from "./views/PaintingView";
import AboutView from "./views/AboutView";
import FavoritesManager from "./components/layout/FavoritesManager";
import "./App.css";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [favorites, setFavorites] = useState({
    paintings: [],
    artists: [],
    galleries: []
  });

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const addFavorite = (type, item) => {
    if (!favorites[type].includes(item)) {
      setFavorites(prev => ({
        ...prev,
        [type]: [...prev[type], item]
      }));
    }
  };

  const removeFavorite = (type, item) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(fav => fav !== item)
    }));
  };

  const clearFavorites = () => setFavorites({
    paintings: [],
    artists: [],
    galleries: []
  });

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/galleries" element={<GalleryView addFavorite={addFavorite} removeFavorite={removeFavorite} favorites={favorites} />} />
          <Route path="/artists" element={<ArtistView addFavorite={addFavorite} removeFavorite={removeFavorite} favorites={favorites} />} />
          <Route path="/genres" element={<GenreView addFavorite={addFavorite} removeFavorite={removeFavorite} favorites={favorites} />} />
          <Route path="/paintings" element={<PaintingView addFavorite={addFavorite} removeFavorite={removeFavorite} favorites={favorites} />} />
          <Route path="/about" element={<AboutView />} />
        </Routes>

        <FavoritesManager
          favorites={favorites}
          removeFavorite={removeFavorite}
          clearFavorites={clearFavorites}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      </div>
    </Router>
  );
}

export default App;
