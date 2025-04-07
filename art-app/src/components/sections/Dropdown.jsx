/**
 * This project was developed with coding guidance, debugging support, 
 * and implementation advice provided by ChatGPT.
 */
// Dropdown.jsx
// This component renders a dropdown menu with a label, options, and an onChange event handler

import React from 'react';

const Dropdown = ({ label, options, onChange, value, placeholder }) => {
    return (
        <div className="mb-4 w-[50%] mx-auto">
            <label htmlFor="dropdown" className="block mb-1 font-semibold text-gray-600 text-xs">{label}</label>
            <select
                id="dropdown"
                className="border border-gray-300 rounded p-1 w-full mb-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={onChange}
                value={value || ""}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
