import React from 'react';

const Dropdown = ({ label, options, id }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <select id={id}>
            <option value="">--Select--</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export default Dropdown;