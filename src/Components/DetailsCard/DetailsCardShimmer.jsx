import React from "react";
import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Card = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background-color: #d8effe;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 0 0 20px 20px;
    box-shadow: 0px 6px 10px 0px #d7d7d7;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
`;

const ShimmerCircle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
`;

const ShimmerText = styled.div`
    width: 90px;
    height: 22px;
    border-radius: 4px;
    margin: 4px 0;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
`;

const CenterIcons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const ShimmerIcon = styled.div`
    width: 30px;
    height: 15px;
    border-radius: 8px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
`;

const DetailsCardShimmer = () => (
    <Card>
        <ProfileContainer>
            <ShimmerCircle />
            <ShimmerText />
        </ProfileContainer>
        <CenterIcons>
            <ShimmerIcon />
            <ShimmerIcon />
        </CenterIcons>
        <ProfileContainer>
            <ShimmerCircle />
            <ShimmerText />
        </ProfileContainer>
    </Card>
);

export default DetailsCardShimmer;
