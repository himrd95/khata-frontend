import React, { useState } from "react";
import { getCloudinaryUrl } from "../../utils/helpers";
import { FaUserCircle } from "react-icons/fa";

/**
 * A reusable profile image component that handles loading errors
 * and shows a fallback icon when an image fails to load
 *
 * @param {Object} props Component props
 * @param {string} props.src Image source URL or Cloudinary public ID
 * @param {string} props.alt Alt text for the image
 * @param {Object} props.imgStyle Additional styles for the image
 * @param {Object} props.iconStyle Additional styles for the fallback icon
 * @param {Object} props.containerStyle Additional styles for the container
 * @param {string} props.className Additional class name for the container
 * @param {string} props.iconClassName Additional class name for the fallback icon
 * @returns {JSX.Element} ProfileImage component
 */
const ProfileImage = ({
    src,
    alt = "profile picture",
    imgStyle = {},
    iconStyle = {},
    containerStyle = {},
    className = "",
    iconClassName = "fas fa-user-circle",
}) => {
    const [hasError, setHasError] = useState(false);

    const handleImageError = () => {
        setHasError(true);
    };

    const containerStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle,
    };

    const defaultImgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...imgStyle,
    };

    const defaultIconStyle = {
        fontSize: "40px",
        color: "#39354b",
        ...iconStyle,
    };

    if (!src || hasError) {
        return (
            <div className={className} style={containerStyles}>
                <FaUserCircle style={defaultIconStyle} />
            </div>
        );
    }

    return (
        <div className={className} style={containerStyles}>
            <img
                src={src.includes("http") ? src : getCloudinaryUrl(src)}
                alt={alt}
                style={defaultImgStyle}
                onError={handleImageError}
            />
        </div>
    );
};

export default ProfileImage;
