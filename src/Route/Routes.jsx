import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
import Profile from "../Components/Profile/Profile";
import SlidingComponent from "../Components/SlidingComponent/SlidingComponent";

const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" element={<SlidingComponent />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/error404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default memo(Routing);
