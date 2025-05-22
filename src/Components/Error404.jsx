import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SEO from "./SEO";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    text-align: center;
    background-color: #f8f9fa;
`;

const Title = styled.h1`
    font-family: "Kanit", sans-serif;
    font-size: 6rem;
    color: #2c3e50;
    margin: 0;
    line-height: 1;
`;

const Subtitle = styled.h2`
    font-family: "Kanit", sans-serif;
    font-size: 1.5rem;
    color: #666;
    margin: 20px 0;
`;

const Message = styled.p`
    font-family: "Kanit", sans-serif;
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 30px;
`;

const HomeButton = styled(Link)`
    font-family: "Kanit", sans-serif;
    padding: 12px 24px;
    background-color: #2c3e50;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        background-color: #34495e;
        transform: translateY(-2px);
    }
`;

const Error404 = () => {
    return (
        <>
            <SEO
                title="Page Not Found - Khata"
                description="The page you're looking for doesn't exist. Return to Khata's home page to manage your expenses."
                url="https://khata-manager.netlify.app/error404"
            />
            <Container>
                <Title>404</Title>
                <Subtitle>Page Not Found</Subtitle>
                <Message>
                    Oops! The page you're looking for doesn't exist or has been
                    moved. Let's get you back to managing your expenses.
                </Message>
                <HomeButton to="/">Return to Home</HomeButton>
            </Container>
        </>
    );
};

export default Error404;
