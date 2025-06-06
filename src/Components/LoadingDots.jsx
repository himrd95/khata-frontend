import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
    font-family: "Kanit", sans-serif;
    background-color: rgba(0, 0, 0, 0.03);
    padding: 8px 8px;
    border-radius: 8px;
    transition: all 0.3s ease;
    animation: fadeIn 0.3s ease-in;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Text = styled.span`
    color: #666666;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.3px;
`;

const TextWithDot = styled.span`
    margin-top: -6px;
`;

const DotsContainer = styled.div`
    display: inline-block;
    color: #666666;
    font-size: 1rem;
    letter-spacing: 2px;
    width: 16px;
    text-align: left;
    font-weight: 600;
`;

const LoadingDots = ({ title, message }) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev.length >= 3) return "";
                return prev + ".";
            });
        }, 400); // Speed of dot appearance

        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <Text>{title}</Text>
            <TextWithDot>
                <Text>{message}</Text>
                <DotsContainer>{dots}</DotsContainer>
            </TextWithDot>
        </Container>
    );
};

export default memo(LoadingDots);
