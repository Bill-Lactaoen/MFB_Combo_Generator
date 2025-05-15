// src/components/Dropdown.jsx
import React from "react";
import Select from "react-select";

export default function Dropdown({
                                     label,
                                     options,
                                     value,
                                     onChange,
                                     isDisabled = false,
                                     placeholder = "Select an option...",
                                 }) {
    return (
        <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
                {label}
            </label>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                isDisabled={isDisabled}
                isSearchable
                placeholder={placeholder}
            />
        </div>
    );
}
