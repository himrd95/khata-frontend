import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const LogoText = styled.span`
    font-family: "Kanit", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: 0.5px;
`;

const LogoIcon = styled.svg`
    width: 32px;
    height: 32px;
`;

const Logo = ({ size = "medium" }) => {
    const sizes = {
        small: { icon: 24, text: "1.2rem" },
        medium: { icon: 32, text: "1.5rem" },
        large: { icon: 48, text: "2rem" },
    };

    const { icon, text } = sizes[size];

    return (
        <LogoContainer>
            <LogoIcon
                width={icon}
                height={icon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                    fill="#2c3e50"
                />
            </LogoIcon>
            <LogoText style={{ fontSize: text }}>Khata</LogoText>
        </LogoContainer>
    );
};

export default Logo;
