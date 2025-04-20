import React, { useContext } from "react";
import Dashboard from "../Dashboard/Dashboard";
import UserTransactions from "../UserTransactions/UserTransactions";
import { provider } from "../../Context/ContextPovider";
import { Slider } from "./Styles";
import { isEmpty } from "../../utils/helpers";

const SlidingComponent = () => {
    const { currentUser } = useContext(provider);
    
    return (
        <Slider slideLeft={!isEmpty(currentUser)}>
            <Dashboard />
            <UserTransactions />
        </Slider>
    );
};

export default SlidingComponent;
