import React from 'react';

const Dropdown = ({ label, options, onChange, value, placeholder }) => {
    return (
        <div className="mb-6">
            <label htmlFor="dropdown" className="block mb-2 font-bold text-gray-700">{label}</label>
            <select
                id="dropdown"
                className="border border-gray-300 rounded p-2 w-full mb-4"
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
