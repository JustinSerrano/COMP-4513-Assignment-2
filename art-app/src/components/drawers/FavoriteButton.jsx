import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const FavoriteButton = ({ isDrawerOpen, toggleDrawer, hasFavorites }) => {
    return (
        <button
            onClick={toggleDrawer}
            className={`fixed bottom-5 transition-all duration-300 z-50
            ${isDrawerOpen ? 'right-[400px]' : 'right-5'} p-3 rounded-full shadow-lg border border-gray-300 
            ${hasFavorites ? 'bg-white text-yellow-400 hover:text-yellow-500' : 'bg-white text-gray-400 hover:text-gray-500'}`}
        >
            <FontAwesomeIcon icon={faStar} size="2x" />
        </button>
    );
}

export default FavoriteButton;
