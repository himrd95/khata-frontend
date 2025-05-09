import React, { memo, useContext, useMemo } from "react";
import "./DetailsCard.css";
import cx from "classnames";
import DetailsCardShimmer from "./DetailsCardShimmer";

import { provider } from "../../Context/ContextPovider";
import { getBalanceColor, getCloudinaryUrl } from "../../utils/helpers";
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
    const { name, userImage } = currentUser;
    const randomNumber = Math.floor(Math.random() * 7);

    const balanceColor = useMemo(
        () => getBalanceColor(totalBalnce),
        [totalBalnce]
    );

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

                    <div className={cx("profileText", name && "flexClass")}>
                        {!name && (
                            <span className="welcomeText">
                                {welcomeTexts[randomNumber]}
                            </span>
                        )}
                        <span>{adminPannel.admin.name.split(" ")[0]}</span>
                    </div>
                </div>

                {name && (
                    <div className="transferIcons">
                        <i class="fa-solid fa-left-right"></i>
                    </div>
                )}

                {name && (
                    <div className="profileContainer">
                        <div className="profilePic">
                            {!userImage ? (
                                <i className="fas fa-user-circle"></i>
                            ) : (
                                <img
                                    src={getCloudinaryUrl(userImage)}
                                    alt="profile_picture"
                                    width="100%"
                                    height="100%"
                                />
                            )}
                        </div>

                        <div className={cx("profileText", name && "flexClass")}>
                            <span>{name}</span>
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
