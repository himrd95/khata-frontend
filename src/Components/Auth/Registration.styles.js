import styled from "styled-components";
import { Box } from "@mui/material";

export const HeroSection = styled(Box)`
    width: 100%;
    height: 100vh;
    color: rgb(6, 38, 68);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: "";
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        // background-image: url("/money_exchange_.png");
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgb(212, 235, 240);
        z-index: 1;
    }
`;

export const ContentWrapper = styled(Box)`
    width: 80%;
    max-width: 800px;
    margin: auto;
    position: relative;
    z-index: 2;
    text-align: center;
`;

export const LottieWrapper = styled(Box)`
    margin-top: -250px;
    height: 495px;
`;

export const TitleWrapper = styled(Box)`
    margin-top: -90px;
`;

export const Title = styled("h3")`
    font-family: "Montserrat", sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #072949;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.5px;
    line-height: 1.2;
`;

export const Subtitle = styled("h3")`
    font-family: "Montserrat", sans-serif;
    margin-top: -0.5rem;
    font-size: 1.5rem;
    font-weight: 500;
    color: #103c66;
    letter-spacing: -0.3px;
`;

export const BottomSection = styled(Box)`
    bottom: 80px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LoginText = styled("p")`
    font-family: "Kanit", sans-serif;
    font-size: 1rem;
    color: rgb(6, 42, 76);
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
