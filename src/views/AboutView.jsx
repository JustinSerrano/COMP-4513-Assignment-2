/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// AboutView.jsx
// This component serves as the "About" page of the application, providing information about its purpose, technologies used, and features.

import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutView = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow p-8 flex flex-col items-center">
                <div className="w-full max-w-4xl p-6 bg-white shadow rounded-lg space-y-4">
                    <h2 className="text-3xl font-bold mb-4 text-center">About This App</h2>

                    <div className="space-y-4">
                        <section>
                            <h3 className="text-xl font-bold mb-2">Purpose</h3>
                            <p>
                                This web application is built to showcase various artworks, artists, galleries, and genres in an interactive and user-friendly manner.
                                Users can filter paintings by various criteria, view detailed information, and save their favorite items for easy access.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold mb-2">Technologies Used</h3>
                            <ul className="list-disc list-inside ml-4">
                                <li><strong>React:</strong> With hooks and componentization for seamless state management and UI rendering.</li>
                                <li><strong>Tailwind CSS:</strong> Utility-first styling for a clean and responsive user interface.</li>
                                <li><strong>Supabase:</strong> For database management and fetching data in real-time.</li>
                                <li><strong>Headless UI:</strong> Accessibility-focused UI components like Drawers and Modals.</li>
                                <li><strong>React Router:</strong> For intuitive client-side routing.</li>
                                <li><strong>Vercel:</strong> For fast and seamless deployment of the application.</li>
                                <li><strong>ChatGPT:</strong> For coding guidance, debugging support, and implementation advice.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold mb-2">Tools</h3>
                            <ul className="list-disc list-inside ml-4">
                                <li><strong>Vite:</strong> For a fast and optimized development environment.</li>
                                <li><strong>FontAwesome:</strong> For various icons used throughout the application.</li>
                                <li><strong>Leaflet:</strong> For rendering interactive maps in gallery views.</li>
                                <li><strong>Headless UI:</strong> Providing smooth transitions and improved accessibility.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold mb-2">Features</h3>
                            <ul className="list-disc list-inside ml-4">
                                <li>Filter paintings by title, artist, gallery, and year.</li>
                                <li>View detailed information on each painting, artist, and gallery.</li>
                                <li>Save favorite items with persistent storage using <strong>FavoritesManager</strong>.</li>
                                <li>Dynamic modals and drawers with smooth transitions.</li>
                                <li>Responsive design with Tailwind CSS for various devices.</li>
                                <li>Deployment through <strong>Vercel</strong> for optimal performance.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AboutView;
