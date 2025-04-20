import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const LoaderContainer = styled.div`
    width: 100%;
    height: 4px;
    margin-bottom: -10px;
    background-color: #007aff;
    position: relative;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 10px;
`;

export const LoaderLine = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, #007aff 0%, #e0e0e0 50%, #007aff 100%);
    animation: ${shimmer} 1.5s infinite;
    transform-origin: 0% 50%;
`;
