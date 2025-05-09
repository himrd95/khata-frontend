import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
    width: ${(props) => props.size || "120px"};
    height: ${(props) => props.size || "120px"};
    margin: ${(props) => props.margin || "0"};
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: 50%;
    overflow: hidden;
`;

const LogoAnimation = ({ size, margin }) => {
    return (
        <LogoContainer size={size} margin={margin}>
            <lottie-player
                src="https://assets2.lottiefiles.com/packages/lf20_7JQYwXZQnB.json"
                background="transparent"
                speed="1"
                loop
                autoplay
            />
        </LogoContainer>
    );
};

export default LogoAnimation;
