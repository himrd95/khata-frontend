import React, { memo, useContext, useMemo } from "react";
import "./DetailsCard.css";
import cx from "classnames";
import DetailsCardShimmer from "./DetailsCardShimmer";

import { provider } from "../../Context/ContextPovider";
import {
    getBalanceColor,
    getCloudinaryUrl,
    isEmpty,
} from "../../utils/helpers";
import { moneyFormate } from "../../constants";

const welcomeTexts = [
    "Welcome back,",
    "Welcome",
    "Hi,",
    "Hey,",
    "Hi, there!",
    "Hello",
];

const DetailsCard = () => {
    const { adminPannel, currentUser, refreshProfile, totalBalnce } =
        useContext(provider);
    const { name: currentUserName, userImage: currentUserImage } = currentUser;

    const welcomeText = useMemo(() => {
        const randomNumber = Math.floor(Math.random() * 7);
        return welcomeTexts[randomNumber];
    }, []);

    const balanceColor = useMemo(
        () => getBalanceColor(totalBalnce),
        [totalBalnce]
    );

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
                        {!adminPannel?.admin?.profile ? (
                            <i className="fas fa-user-circle"></i>
                        ) : (
                            <img
                                src={getCloudinaryUrl(
                                    adminPannel?.admin?.profile
                                )}
                                alt="profile_picture"
                                height="100%"
                                width="100%"
                            />
                        )}
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
                        <i class="fa-solid fa-left-right"></i>
                    </div>
                )}

                {currentUserName && (
                    <div className="profileContainer">
                        <div className="profilePic">
                            {!currentUserImage ? (
                                <i className="fas fa-user-circle"></i>
                            ) : (
                                <img
                                    src={getCloudinaryUrl(currentUserImage)}
                                    alt="profile_picture"
                                    width="100%"
                                    height="100%"
                                />
                            )}
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
            <div
                className="totalBalanceRow"
                style={{
                    background: `linear-gradient(180deg, rgba(255,255,255,1) 0%, ${balanceColor} 300%)`,
                }}
            >
                <span className="totalBalanceLabel">Total Balance</span>
                <span className="totalBalanceValue">{` ${moneyFormate(
                    totalBalnce
                )}`}</span>
            </div>
        </div>
    );
};

export default memo(DetailsCard);
