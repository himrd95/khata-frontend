import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_CTA_BG_GRADIENT, EVENTS, TABS } from "../../../constants";
import eventBus from "../../../utils/eventBus";
import "./BottomNav.css";
import cx from "classnames";
import { provider } from "../../../Context/ContextPovider";
import { isEmpty } from "../../../utils/helpers";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const attentionGrab = keyframes`
  0% {
    transform: translate(-50%) scale(1) rotate(0deg);
  }
  5% {
    transform: translate(-52%) scale(1) rotate(-5deg);
  }
  10% {
    transform: translate(-48%) scale(1) rotate(5deg);
  }
  15% {
    transform: translate(-52%) scale(1) rotate(-5deg);
  }
  20% {
    transform: translate(-48%) scale(1) rotate(5deg);
  }
  25% {
    transform: translate(-50%) scale(1) rotate(0deg);
  }
  /* Pause */
  45% {
    transform: translate(-50%) scale(1) rotate(0deg);
  }
  /* Scale up with slight rotation */
  60% {
    transform: translate(-50%) scale(1.1) rotate(10deg);
  }
  /* Bounce back */
  75% {
    transform: translate(-50%) scale(0.95) rotate(-5deg);
  }
  /* Final settle */
  100% {
    transform: translate(-50%) scale(1) rotate(0deg);
  }
`;

const AnimatedPlusButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: ${ADD_CTA_BG_GRADIENT};
    border-radius: 50%;
    cursor: pointer;
    animation: ${attentionGrab} 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    svg {
        color: white;
        font-size: 24px;
        transition: transform 0.2s ease;
    }

    &:active {
        transform: translateX(-50%) scale(0.95);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
`;

const BottomNav = () => {
    const { setCurrentUser, currentUser, activeTab, setActiveTab } = useContext(provider);
    const path = useLocation();

    const handleRoute = useCallback(
        (tab) => {
            
            if (tab === TABS.HOME || tab === TABS.PROFILE) {
                setCurrentUser({});
                setActiveTab(tab);
            } else if (path.pathname === "/dashboard" && activeTab === TABS.HOME && isEmpty(currentUser)) {
                eventBus.dispatch(EVENTS.ADD_NEW_USER, "");
            } else {
                if (activeTab === TABS.PROFILE) {
                    setActiveTab(TABS.HOME);
                } else {
                    eventBus.dispatch(EVENTS.ADD_NEW_TRANSACTION, true);
                }
            }
        },
        [setActiveTab, path.pathname, activeTab, currentUser, setCurrentUser]
    );

    const getClassName = useCallback(
        (tab) => {
            return cx("nav-item", {
                active: activeTab === tab,
                "user-icon": tab === TABS.PROFILE,
            });
        },
        [activeTab]
    );

    useEffect(() => {
        if (activeTab === TABS.PROFILE) {
            setActiveTab(TABS.PROFILE);
        }
    }, [activeTab, path.pathname, setActiveTab]);

    return (
        <>
            <div className="bottom-nav">
                <div
                    style={{ left: activeTab === TABS.PROFILE ? "75%" : "25%" }}
                    className="active-dot"
                ></div>
                <div
                    className={getClassName(TABS.HOME)}
                    onClick={() => handleRoute(TABS.HOME)}
                >
                    <FaHome />
                </div>

                <AnimatedPlusButton onClick={() => handleRoute(TABS.ADD)}>
                    <FaPlus />
                </AnimatedPlusButton>

                <div
                    className={getClassName(TABS.PROFILE)}
                    onClick={() => handleRoute(TABS.PROFILE)}
                >
                    <FaUser />
                </div>
            </div>
        </>
    );
};

export default React.memo(BottomNav);
