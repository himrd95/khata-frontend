import styled from "styled-components";

export const Slider = styled.div(({ slideLeft }) => ({
    display: "flex",
    width: "200vw",
    transform: `translateX(${slideLeft ? "-100vw" : "0"})`,
    transition: "0.3s",
    minHeight: "100vh",
}));
