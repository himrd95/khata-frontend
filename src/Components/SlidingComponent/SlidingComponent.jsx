import React, { useContext, useEffect } from "react";
import Dashboard from "../Dashboard/Dashboard";
import UserTransactions from "../UserTransactions/UserTransactions";
import { provider } from "../../Context/ContextPovider";
import { Slider } from "./Styles";
import { isEmpty } from "../../utils/helpers";

const SlidingComponent = () => {
    const { currentUser } = useContext(provider);

    // Reset scroll position when switching views
    useEffect(() => {
        // Scroll to top whenever the currentUser state changes
        window.scrollTo(0, 0);
    }, [currentUser._id]);

    return (
        <Slider slideLeft={!isEmpty(currentUser)} className="sliding-container">
            <Dashboard />
            <UserTransactions />
        </Slider>
    );
};

export default SlidingComponent;
