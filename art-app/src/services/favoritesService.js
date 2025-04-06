export const fetchFavorites = (type) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    return Array.from(favorites[type] || []);
};

export const addFavorite = (type, id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (!favorites[type]) favorites[type] = new Set();
    favorites[type].add(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const removeFavorite = (type, id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (favorites[type]) {
        const updatedFavorites = favorites[type].filter(favId => favId !== id);
        favorites[type] = updatedFavorites;
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};
