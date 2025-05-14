import React, { useContext, useEffect, useRef } from "react";
import Dashboard from "../Dashboard/Dashboard";
import UserTransactions from "../UserTransactions/UserTransactions";
import { provider } from "../../Context/ContextPovider";
import { Slider } from "./Styles";
import { isEmpty } from "../../utils/helpers";

const SlidingComponent = () => {
    const { currentUser } = useContext(provider);
    const containerRef = useRef(null);

    // Using a new approach: scroll parent element on view change
    useEffect(() => {
        // Reset scroll position whenever user changes
        if (containerRef.current && containerRef.current.parentElement) {
            // Scroll the parent element (typically the window or the app container)
            containerRef.current.parentElement.scrollTop = 0;

            // Also attempt window scrolling as a fallback
            window.scrollTo(0, 0);
        }
    }, [currentUser]);

    return (
        <Slider
            ref={containerRef}
            slideLeft={!isEmpty(currentUser)}
            className="sliding-container"
        >
            <Dashboard />
            <UserTransactions />
        </Slider>
    );
};

export default SlidingComponent;
