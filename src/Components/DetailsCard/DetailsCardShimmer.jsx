import React from "react";
import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const Card = styled.div`
    width: 100%;
    max-width: 420px;
    min-width: 280px;
    background: #eaf6ff;
    border-radius: 0 0 28px 28px;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
    padding: 16px 4px 4px;
    position: fixed;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const ProfilePicShimmer = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto 12px auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
`;

const NameShimmer = styled.div`
    width: 120px;
    height: 22px;
    border-radius: 8px;
    margin: 0 auto 16px auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
`;

const BalanceRowShimmer = styled.div`
    width: 98%;
    height: 36px;
    border-radius: 4px 4px 24px 24px;
    margin: 18px auto 0 auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
`;

const DetailsCardShimmer = () => (
    <Card>
        <ProfilePicShimmer />
        <NameShimmer />
        <BalanceRowShimmer />
    </Card>
);

export default DetailsCardShimmer;
