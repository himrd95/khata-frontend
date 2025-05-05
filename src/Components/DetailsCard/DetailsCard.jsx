import React, { memo, useContext } from "react";
import "./DetailsCard.css";
import cx from "classnames";

import { provider } from "../../Context/ContextPovider";
import { getCloudinaryUrl } from "../../utils/helpers";
const welcomeTexts = [
    "Welcome back,",
    "Welcome",
    "Hi,",
    "Hey,",
    "Hi, there!",
    "Hello",
];

const DetailsCard = () => {
    const { adminPannel, currentUser } = useContext(provider);
    const { name, userImage } = currentUser;
    const randomNumber = Math.floor(Math.random() * 7);

    return (
        <>
            <div className="detailsCard">
                <div className="profileContainer">
                    <div className="profilePic">
                        {!adminPannel.admin.profile ? (
                            <i className="fas fa-user-circle"></i>
                        ) : (
                            <img
                                src={getCloudinaryUrl(
                                    adminPannel.admin.profile
                                )}
                                alt="pofile_picture"
                                height="100%"
                            />
                        )}
                    </div>

                    <div className={cx("profileText", name && "flexClass")}>
                        {!name && (
                            <span
                                style={{
                                    margin: "0 5px",
                                    textTransform: "capitalize",
                                }}
                            >
                                {welcomeTexts[randomNumber]}
                            </span>
                        )}
                        <span>{adminPannel.admin.name.split(" ")[0]}</span>
                    </div>
                </div>

                {name && (
                    <div className="transferIcons">
                        <i class="fa-solid fa-left-long"></i>
                        <i class="fa-solid fa-right-long"></i>
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
                                    alt="pofile_picture"
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
        </>
    );
};

export default memo(DetailsCard);
