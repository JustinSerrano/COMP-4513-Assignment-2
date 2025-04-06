import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const FavoritesDrawer = ({ isOpen, onClose, favorites, removeFavorite, clearFavorites }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden z-50" onClose={onClose}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="absolute right-0 top-0 w-96 bg-white shadow-xl h-full">
                            <div className="p-4 flex justify-between items-center border-b border-gray-200">
                                <h2 className="text-xl font-bold">Favorites</h2>
                                <button
                                    onClick={clearFavorites}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transform transition-transform duration-200 hover:scale-105"
                                >
                                    Clear Favorites
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto max-h-[90vh]">
                                <div>
                                    <h3 className="font-bold mb-2">Favorite Paintings</h3>
                                    <ul>
                                        {favorites.paintings.map((painting, index) => (
                                            <li key={index} className="flex justify-between items-center mb-2">
                                                <span>{painting}</span>
                                                <button
                                                    onClick={() => removeFavorite('paintings', painting)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Favorite Artists</h3>
                                    <ul>
                                        {favorites.artists.map((artist, index) => (
                                            <li key={index} className="flex justify-between items-center mb-2">
                                                <span>{artist}</span>
                                                <button
                                                    onClick={() => removeFavorite('artists', artist)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Favorite Galleries</h3>
                                    <ul>
                                        {favorites.galleries.map((gallery, index) => (
                                            <li key={index} className="flex justify-between items-center mb-2">
                                                <span>{gallery}</span>
                                                <button
                                                    onClick={() => removeFavorite('galleries', gallery)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FavoritesDrawer;
