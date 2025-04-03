import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const links = [
        { name: "Galleries", path: "/galleries" },
        { name: "Artists", path: "/artists" },
        { name: "Genres", path: "/genres" },
        { name: "Paintings", path: "/paintings" },
        { name: "Favorites", path: "/favorites" }
    ];

    return (
        <header className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">Art Dashboard</h1>
            <nav>
                {links.map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? "text-gray-400 mx-2 cursor-not-allowed" : "mx-2 hover:text-gray-300"
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
