import React, { useState, useRef, useEffect } from "react";
import "./UpdateUser.css";

const CustomSelect = ({ options, selected, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    const toggleDropdown = () => setOpen(!open);

    const handleSelect = (value) => {
        onChange(value);
        setOpen(false);
    };

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    return (
        <div className="custom-select-container apple-form-group" ref={ref}>
            <label>Mode</label>
            <div
                className={`custom-select-box ${open ? "open" : ""}`}
                onClick={toggleDropdown}
            >
                {selected || "Select mode"}
                <span className="arrow">
                    <i class="fa-solid fa-chevron-down"></i>
                </span>
            </div>
            {open && (
                <ul className="custom-select-options">
                    {options.map((option) => (
                        <li
                            key={option.label}
                            className={`option ${
                                selected === option.value ? "selected" : ""
                            }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
