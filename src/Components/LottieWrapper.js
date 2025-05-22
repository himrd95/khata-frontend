import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;

    lottie-player {
        width: 100%;
        height: 100%;
    }

    .loading-fallback {
        color: #072949;
        font-size: 1.2rem;
        text-align: center;
    }
`;

const LottieWrapper = ({ children }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        // Ensure Lottie player is loaded
        if (typeof window !== "undefined" && !window.loadLottiePlayer) {
            window.loadLottiePlayer = new Promise((resolve) => {
                const script = document.createElement("script");
                script.src =
                    "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }

        // Initialize player when script is loaded
        if (window.loadLottiePlayer) {
            window.loadLottiePlayer.then(() => {
                if (playerRef.current) {
                    const player = playerRef.current;
                    player.load();
                    player.play();
                }
            });
        }
    }, []);

    return (
        <Wrapper>
            {children}
            <div ref={playerRef} className="loading-fallback">
                Loading animation...
            </div>
        </Wrapper>
    );
};

export default LottieWrapper;
