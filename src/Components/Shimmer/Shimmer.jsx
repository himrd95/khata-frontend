import React from "react";
import "./Shimmer.css";

const Shimmer = ({ count = 8 }) => {
    return (
        <div className="shimmer-wrapper">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="shimmer-card">
                    <div className="shimmer-content" />
                </div>
            ))}
        </div>
    );
};

export default Shimmer;
