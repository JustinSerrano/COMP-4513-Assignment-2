import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import GalleryView from "./views/GalleryView";
import ArtistView from "./views/ArtistView";
import GenreView from "./views/GenreView";
import PaintingView from "./views/PaintingView";
// import FavoritesPopup from "./components/FavoritesPopup";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/galleries" element={<GalleryView />} />
        <Route path="/artists" element={<ArtistView />} />
        <Route path="/genres" element={<GenreView />} />
        <Route path="/paintings" element={<PaintingView />} />
      </Routes>
    </Router>
  );
}

export default App;
