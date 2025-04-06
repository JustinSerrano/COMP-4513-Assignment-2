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
                                <li>React (with hooks and componentization)</li>
                                <li>Tailwind CSS for styling</li>
                                <li>Supabase for database management</li>
                                <li>Headless UI for Drawer and Modal implementations</li>
                                <li>React Router for client-side routing</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold mb-2">Tools</h3>
                            <ul className="list-disc list-inside ml-4">
                                <li>Vite for fast development environment</li>
                                <li>FontAwesome for icons</li>
                                <li>Leaflet for map rendering</li>
                                <li>Headless UI for accessibility-focused UI components</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold mb-2">Features</h3>
                            <ul className="list-disc list-inside ml-4">
                                <li>Filter paintings by title, artist, gallery, and year</li>
                                <li>View detailed information on each painting, artist, and gallery</li>
                                <li>Favorite items with persistent storage</li>
                                <li>Dynamic modals and drawers with smooth transitions</li>
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
