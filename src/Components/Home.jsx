import React, { memo } from "react";
import BottomNav from "../Components/Navbar/BottomNav/BottomNav";
import DetailsCard from "../Components/DetailsCard/DetailsCard";
import Routing from "../Route/Routes";
import Modal from "./Common/Modal";
import Snackbar from "./Common/Snackbar";

const Home = () => {
    return (
        <>
            <DetailsCard />
            <Routing />
            <BottomNav />
            <Modal />
            {/* <Snackbar /> */}
        </>
    );
};

export default memo(Home);
