import React, { memo, useContext, useMemo } from "react";
import "./DetailsCard.css";
import cx from "classnames";
import DetailsCardShimmer from "./DetailsCardShimmer";

import { provider } from "../../Context/ContextPovider";
import { getBalanceColor, isEmpty } from "../../utils/helpers";
import { moneyFormate } from "../../constants";
import ProfileImage from "../Common/ProfileImage";

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
                        <i className="fa-solid fa-left-right"></i>
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
