import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scaleX(0.95);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
  100% {
    opacity: 0.6;
    transform: scaleX(0.95);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const LoaderContainer = styled.div`
    width: 100%;
    height: 4px;
    margin-bottom: -10px;
    background: linear-gradient(
        90deg,
        rgba(26, 42, 136, 0.1) 0%,
        rgba(26, 35, 86, 0.2) 50%,
        rgba(26, 42, 136, 0.1) 100%
    );
    position: relative;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 10px;
    border-radius: 2px;
    animation: ${pulse} 2s ease-in-out infinite;
`;

export const LoaderLine = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        rgba(26, 42, 136, 0.1) 0%,
        rgba(126, 147, 236, 0.4) 25%,
        rgba(17, 31, 106, 0.8) 50%,
        rgba(124, 134, 181, 0.4) 75%,
        rgba(26, 42, 136, 0.1) 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s linear infinite;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(41, 60, 172, 0.2);
`;
