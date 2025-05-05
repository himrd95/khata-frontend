import React, { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EVENTS } from "../../../constants";
import eventBus from "../../../utils/eventBus";
import "./BottomNav.css";
import cx from "classnames";
import { provider } from "../../../Context/ContextPovider";
import { isEmpty } from "../../../utils/helpers";

const TABS = {
    HOME: "HOME",
    ADD: "ADD",
    PROFILE: "PROFILE",
};

const BottomNav = () => {
    const [active, setActive] = useState(TABS.HOME);
    const { setCurrentUser, currentUser } = useContext(provider);
    const path = useLocation();
    const navigate = useNavigate();

    const handleRoute = useCallback(
        (tab) => {
            setActive(tab);
            if (tab === TABS.HOME) {
                setCurrentUser({});
                if (path.pathname === "/profile") {
                    navigate("/");
                }
            } else if (tab === TABS.PROFILE) {
                navigate("/profile");
                setCurrentUser({});
            } else if (path.pathname === "/" && isEmpty(currentUser)) {
                return eventBus.dispatch(EVENTS.ADD_NEW_USER, true);
            } else {
                return eventBus.dispatch(EVENTS.ADD_NEW_TRANSACTION, true);
            }
        },
        [currentUser, navigate, path.pathname, setCurrentUser]
    );

    const getClassName = useCallback(
        (tab) => {
            return cx("nav-item", { active: active === tab });
        },
        [active]
    );

    return (
        <>
            <div className="bottom-nav">
                <div
                    className={getClassName(TABS.HOME)}
                    onClick={() => handleRoute(TABS.HOME)}
                >
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </div>

                <div
                    className="center-button"
                    onClick={() => handleRoute(TABS.ADD)}
                >
                    <i className="fas fa-plus"></i>
                </div>

                <div
                    className={getClassName(TABS.PROFILE)}
                    onClick={() => handleRoute(TABS.PROFILE)}
                >
                    <i className="fa-solid fa-user"></i>
                </div>
            </div>
        </>
    );
};

export default React.memo(BottomNav);
