import React, { memo, useContext, useMemo } from "react";
import BottomNav from "../Components/Navbar/BottomNav/BottomNav";
import DetailsCard from "../Components/DetailsCard/DetailsCard";
import Modal from "./Common/Modal";
import Snackbar from "./Common/Snackbar";
import { provider } from "../Context/ContextPovider";
import { TABS } from "../constants";
import SlidingComponent from "./SlidingComponent/SlidingComponent";
import Profile from "./Profile/Profile";

const Home = () => {
    const { activeTab } = useContext(provider);

    const renderComponent = useMemo(() => {
        if (activeTab === TABS.HOME) {
            return <SlidingComponent />;
        }else if (activeTab === TABS.PROFILE) {
        return <Profile />;
    }
    }, [activeTab]);

    return (
        <>
            <DetailsCard />
            {renderComponent}
            <BottomNav />
            <Modal />
            <Snackbar />
        </>
    );
};

export default memo(Home);
