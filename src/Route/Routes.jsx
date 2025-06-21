import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
import Profile from "../Components/Profile/Profile";
import SlidingComponent from "../Components/SlidingComponent/SlidingComponent";
import LandingPage from "../Components/LandingPage/LandingPage";
import LoginPage from "../Components/LandingPage/LoginPage";
import RegisterPage from "../Components/LandingPage/RegisterPage";
import Home from "../Components/Home";

const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/landing" element={<LandingPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/dashboard" element={<Home />} />
            <Route exact path="/error404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default memo(Routing);
