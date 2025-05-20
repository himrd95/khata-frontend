import React from "react";
import "./Shimmer.css";
import useLoadingTimeout from "../../hooks/useLoadingTimeout";
import LoadingDots from "../LoadingDots";

const Shimmer = ({ count = 10 }) => {
    const { showLongerApiCallMessage, title, message } = useLoadingTimeout();

    return (
        <div className="shimmer-wrapper">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="shimmer-card">
                    <div className="shimmer-content" />
                </div>
            ))}
            {showLongerApiCallMessage && (
                <div className="waiting-message">
                    <LoadingDots title={title} message={message} />
                </div>
            )}
        </div>
    );
};

export default Shimmer;
