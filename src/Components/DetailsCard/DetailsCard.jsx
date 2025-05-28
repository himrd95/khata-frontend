import React, { memo, useContext, useMemo } from "react";
import "./DetailsCard.css";
import cx from "classnames";
import DetailsCardShimmer from "./DetailsCardShimmer";
import { FaArrowsAltH } from "react-icons/fa";

import { provider } from "../../Context/ContextPovider";
import { getBalanceColor, isEmpty } from "../../utils/helpers";
import { moneyFormate } from "../../constants";
import ProfileImage from "../Common/ProfileImage";
import ExpandableCard from "../ExpandableCard/ExpandableCard";

const welcomeTexts = [
    "Welcome back,",
    "Welcome",
    "Hi,",
    "Hey,",
    "Hi, there!",
    "Hello",
];

const DetailsCard = () => {
    const { adminPannel, currentUser, refreshProfile } =
        useContext(provider);
    const { name: currentUserName, userImage: currentUserImage } = currentUser;

    const welcomeText = useMemo(() => {
        const randomNumber = Math.floor(Math.random() * 7);
        return welcomeTexts[randomNumber];
    }, []);
    console.log(adminPannel, "adminPannel");
    const adminName = useMemo(() => {
        if (!isEmpty(currentUserName)) {
            return adminPannel?.admin?.name?.split(" ")[0];
        }
        return adminPannel?.admin?.name;
    }, [adminPannel?.admin?.name, currentUserName]);

    if (refreshProfile) {
        return <DetailsCardShimmer />;
    }

    return (
        <div className="detailsCardContainer">
            <div className="detailsCard">
                <div className="profileContainer">
                    <div className="profilePic">
                        <ProfileImage
                            src={adminPannel?.admin?.profile}
                            alt="admin profile"
                        />
                    </div>

                    <div
                        className={cx(
                            "profileText",
                            currentUserName && "flexClass"
                        )}
                    >
                        {!currentUserName && (
                            <span className="welcomeText">{welcomeText}</span>
                        )}
                        <span>{adminName}</span>
                    </div>
                </div>

                {currentUserName && (
                    <div className="transferIcons">
                        <FaArrowsAltH />
                    </div>
                )}

                {currentUserName && (
                    <div className="profileContainer">
                        <div className="profilePic">
                            <ProfileImage
                                src={currentUserImage}
                                alt="user profile"
                            />
                        </div>

                        <div
                            className={cx(
                                "profileText",
                                currentUserName && "flexClass"
                            )}
                        >
                            <span>{currentUserName}</span>
                        </div>
                    </div>
                )}
            </div>
            <ExpandableCard />
        </div>
    );
};

export default memo(DetailsCard);
