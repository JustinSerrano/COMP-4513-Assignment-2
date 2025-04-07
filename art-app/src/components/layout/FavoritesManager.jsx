/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// FavoritesManager.jsx
// This component manages the state and rendering of the favorites drawer and button
// and ensures that the drawer is not displayed on the login page.

import React from 'react';
import FavoritesDrawer from '../drawers/FavoritesDrawer';
import FavoriteButton from '../drawers/FavoriteButton';
import { useLocation } from 'react-router-dom';

const FavoritesManager = ({ favorites, removeFavorite, clearFavorites, isDrawerOpen, toggleDrawer }) => {
    const location = useLocation();

    // Don't render FavoritesManager on the login page
    if (location.pathname === '/') return null;

    return (
        <>
            {/* Background Blur Effect */}
            {isDrawerOpen && (
                <div className="fixed inset-0 backdrop-blur-sm z-40"></div>  // <-- Blur Effect Layer
            )}

            <FavoriteButton
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                hasFavorites={Object.values(favorites).some(list => list.length > 0)}
            />

            <FavoritesDrawer
                isOpen={isDrawerOpen}
                onClose={toggleDrawer}
                favorites={favorites}
                removeFavorite={removeFavorite}
                clearFavorites={clearFavorites}
            />
        </>
    );
}

export default FavoritesManager;
