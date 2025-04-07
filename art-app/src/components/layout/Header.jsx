/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// Header.jsx
// This component renders the header of the application with a dark blue background and white text
// and includes a logo, title, and navigation links.
// It uses React Router's NavLink for navigation and applies styles based on the active link.

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import mruLogo from '/src/assets/mru-logo.jpg';

const Header = () => {
    const location = useLocation();

    const links = [
        { name: "Galleries", path: "/galleries" },
        { name: "Artists", path: "/artists" },
        { name: "Genres", path: "/genres" },
        { name: "Paintings", path: "/paintings" },
        { name: "About", path: "/about" },
        { name: "Logout", path: "/" },
    ];

    return (
        <header className="bg-[#002855] text-white py-2 px-4 flex justify-between items-center shadow-md text-sm">
            <div className="flex items-center space-x-2">
                <img src={mruLogo} alt="MRU Logo" className="h-9 w-9" />
                <h1 className="text-xl font-bold">Art Dashboard</h1>
            </div>
            <nav>
                {links.map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#A0A0A0] cursor-not-allowed mx-2 text-sm transition"
                                : "text-white mx-2 text-sm hover:text-[#00BFFF] transition"
                        }
                        style={{ pointerEvents: location.pathname === link.path ? "none" : "auto" }}
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}

export default Header;
