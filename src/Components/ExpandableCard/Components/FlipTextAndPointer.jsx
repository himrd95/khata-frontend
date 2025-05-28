import React, { useState, memo, useContext, useMemo, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaHandPointer } from "react-icons/fa";
import { provider } from "../../../Context/ContextPovider";
import { moneyFormate } from "../../../constants";

const flipOut = keyframes`
  0% { transform: rotateX(0); opacity: 1; }
  100% { transform: rotateX(90deg); opacity: 0; }
`;

const flipIn = keyframes`
  0% { transform: rotateX(90deg); opacity: 0; }
  100% { transform: rotateX(0); opacity: 1; }
`;

const pointerClick = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  25% { transform: translate(-50%, -50%) scale(0.9); }
  50% { transform: translate(-50%, -50%) scale(1); }
  75% { transform: translate(-50%, -50%) scale(0.9); }
`;

const floatRows = keyframes`
  0%, 40% { top: 25%; }
  50%, 90% { top: 80%; }
  100% { top: 25%; }
`;

const Container = styled.div`
    width: 100%;
    position: relative;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px 16px 24px 24px;
    padding: 12px 20px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
    background: ${({ bg }) => bg};
    position: relative;
    ${({ clickable }) => clickable && "cursor: pointer;"}
    transition: background 0.3s ease;
`;

const FlippingTextWrapper = styled.span`
    perspective: 600px;
    display: inline-block;
`;

const FlippingText = styled.span`
    display: inline-block;
    transform-origin: center;
    ${({ animate, direction }) =>
        animate &&
        css`
            animation: ${direction === "out" ? flipOut : flipIn} 0.3s forwards;
        `}
`;

const AnimatedRowPointer = styled.div`
    position: absolute;
    left: 70%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    color: #555;
    animation: ${floatRows} 5s ease-in-out infinite,
        ${pointerClick} 1.2s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
`;

const getUserLabel = (count, action) =>
    `${action} <b>${count}</b> user${count === 1 ? "" : "s"}`;

const FlipCard = ({ balanceColor }) => {
    const [flipped, setFlipped] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState("out");
    const [clickEffect, setClickEffect] = useState(false);
    const [showPointer, setShowPointer] = useState(true);
    const { totalGivenByAdmin, totalTakenByAdmin, balancesByUser } =
        useContext(provider);

    const { positiveCount, negativeCount, positiveSum, negativeSum } =
        useMemo(() => {
            return balancesByUser.reduce(
                (acc, user) => {
                    if (user.totalBalance > 0) {
                        acc.positiveCount += 1;
                        acc.positiveSum += user.totalBalance;
                    } else if (user.totalBalance < 0) {
                        acc.negativeCount += 1;
                        acc.negativeSum += user.totalBalance;
                    }
                    return acc;
                },
                {
                    positiveCount: 0,
                    negativeCount: 0,
                    positiveSum: 0,
                    negativeSum: 0,
                }
            );
        }, [balancesByUser]);

    const handleClick = useCallback(() => {
        setClickEffect(true);
        setTimeout(() => setClickEffect(false), 200);
        setAnimating(true);
        setDirection("out");
        setTimeout(() => {
            setFlipped((prev) => !prev);
            setDirection("in");
            setTimeout(() => setAnimating(false), 300);
        }, 300);
        setShowPointer(false);
    }, []);

    const dataFront = [
        {
            label: "Total Given amount",
            value: moneyFormate(totalGivenByAdmin),
            bg: balanceColor(totalGivenByAdmin),
        },
        {
            label: "Total received amount",
            value: moneyFormate(-totalTakenByAdmin),
            bg: balanceColor(-totalTakenByAdmin),
        },
    ];

    const dataBack = [
        {
            label: getUserLabel(positiveCount, "Balance to receive from"),
            value: moneyFormate(positiveSum),
            bg: balanceColor(positiveSum),
        },
        {
            label: getUserLabel(negativeCount, "Balance to pay to"),
            value: moneyFormate(negativeSum),
            bg: balanceColor(negativeSum),
        },
    ];

    const currentData = flipped ? dataBack : dataFront;

    return (
        <Container>
            {showPointer && (
                <AnimatedRowPointer>
                    <FaHandPointer />
                </AnimatedRowPointer>
            )}
            {currentData.map((item, idx) => (
                <Row
                    key={idx}
                    bg={item.bg}
                    onClick={handleClick}
                    clickable={idx < currentData.length - 1}
                    animateClick={clickEffect}
                >
                    <FlippingTextWrapper>
                        <FlippingText
                            animate={animating}
                            direction={direction}
                            key={item.value}
                            dangerouslySetInnerHTML={{ __html: item.label }}
                        />
                    </FlippingTextWrapper>
                    <FlippingTextWrapper>
                        <FlippingText
                            animate={animating}
                            direction={direction}
                            key={item.value}
                        >
                            {item.value}
                        </FlippingText>
                    </FlippingTextWrapper>
                </Row>
            ))}
        </Container>
    );
};

export default memo(FlipCard);
