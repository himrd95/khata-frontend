import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    width: fit-content;
    margin: ${(props) => props.margin || "10px auto"};
    padding-bottom: ${(props) => (props.hasError ? "35px" : "0")};
    transition: padding-bottom 0.3s ease;
`;

const ImagePreviewBox = styled.div`
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "150px"};
    border: 2px dashed
        ${(props) => (props.hasError ? "#ff4444" : props.borderColor || "#ccc")};
    border-radius: ${(props) => props.borderRadius || "8px"};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    background: ${(props) =>
        props.hasError ? "#fff5f5" : props.backgroundColor || "#f5f5f5"};
    transition: all 0.3s ease;
    margin: auto;

    &:hover {
        border-color: ${(props) =>
            props.hasError ? "#ff4444" : props.hoverBorderColor || "#666"};
        background: ${(props) =>
            props.hasError
                ? "#fff5f5"
                : props.hoverBackgroundColor || "#f0f0f0"};
    }

    .preview-text {
        color: ${(props) =>
            props.hasError ? "#ff4444" : props.textColor || "#666"};
        text-align: center;
        padding: 0 10px;
        font-size: ${(props) => props.fontSize || "14px"};
    }

    .preview-image {
        width: 100%;
        height: 100%;
        object-fit: ${(props) => props.objectFit || "cover"};
        border-radius: ${(props) => props.imageBorderRadius || "6px"};
    }

    .remove-button {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #ff4444;
        transition: all 0.2s ease;
        z-index: 2;

        &:hover {
            background: #ff4444;
            color: white;
        }
    }
`;

const ErrorMessage = styled.div`
    width: 200px;
    margin-top: 10px;
    color: #ff4444;
    font-size: 12px;
    text-align: center;
    background: #fff5f5;
    padding: 4px 8px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ImageUpload = ({
    onImageSelect,
    onImageRemove,
    previewUrl,
    width = "150px",
    height = "150px",
    placeholderText = "Click to choose profile picture",
    // New customization props
    borderColor,
    borderRadius,
    backgroundColor,
    hoverBorderColor,
    hoverBackgroundColor,
    textColor,
    fontSize,
    objectFit,
    imageBorderRadius,
    margin,
    // Validation props
    maxSizeMB = 5,
    allowedTypes = ["image/jpeg", "image/png", "image/gif"],
    showError = true,
    // Additional props
    disabled = false,
    required = false,
    className,
}) => {
    const inputRef = useRef();
    const [error, setError] = useState("");

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const validateFile = (file) => {
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            const allowedFormats = allowedTypes
                .map((type) => type.split("/")[1].toUpperCase())
                .join(", ");
            setError(`Invalid file type. Allowed formats: ${allowedFormats}`);
            return false;
        }

        // Check file size
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        const formattedFileSize = formatFileSize(file.size);

        if (file.size > maxSizeBytes) {
            setError(
                `File size (${formattedFileSize}) exceeds maximum limit of ${maxSizeMB}MB`
            );
            return false;
        }

        // Validate image dimensions
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                if (img.width < 100 || img.height < 100) {
                    setError(
                        "Image dimensions too small. Minimum size: 100x100px"
                    );
                    resolve(false);
                } else {
                    setError("");
                    resolve(true);
                }
            };
            img.onerror = () => {
                setError("Invalid image file");
                resolve(false);
            };
            img.src = URL.createObjectURL(file);
        });
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const isValid = await validateFile(file);
            if (isValid) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    onImageSelect(file, reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Clear the input if validation fails
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            }
        }
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        setError("");
        onImageRemove();
    };

    return (
        <Container margin={margin} hasError={!!error}>
            <input
                ref={inputRef}
                accept={allowedTypes.join(",")}
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
                disabled={disabled}
                required={required}
            />

            <ImagePreviewBox
                onClick={() => !disabled && inputRef.current?.click()}
                style={{ width, height }}
                borderColor={borderColor}
                borderRadius={borderRadius}
                backgroundColor={backgroundColor}
                hoverBorderColor={hoverBorderColor}
                hoverBackgroundColor={hoverBackgroundColor}
                textColor={textColor}
                fontSize={fontSize}
                objectFit={objectFit}
                imageBorderRadius={imageBorderRadius}
                className={className}
                hasError={!!error}
            >
                {previewUrl ? (
                    <>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="preview-image"
                        />
                        {!disabled && (
                            <button
                                className="remove-button"
                                onClick={handleRemoveImage}
                            >
                                <FaTimes />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="preview-text">
                        {disabled ? "Image upload disabled" : placeholderText}
                    </div>
                )}
            </ImagePreviewBox>
            {showError && error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};

export default ImageUpload;
