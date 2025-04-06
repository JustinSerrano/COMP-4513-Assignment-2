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
        { name: "About", path: "/about" }
    ];

    return (
        <header className="bg-[#002855] text-white py-4 px-8 flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <img src={mruLogo} alt="MRU Logo" className="h-12 w-12 mr-3" />
                <h1 className="text-3xl font-bold">Art Dashboard</h1>
            </div>
            <nav>
                {links.map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#4D4D4F] cursor-not-allowed mx-3 transition"
                                : "mx-3 hover:text-[#0076A8] transition"
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
