import React, { useContext, useMemo } from "react";
import { provider } from "../../Context/ContextPovider";
import { moneyFormate } from "../../constants";
import "./UserDetailsCard.css";
import {
    calculateTotal,
    getBalanceColor,
    getCloudinaryUrl,
} from "../../utils/helpers";

const UserDetailsCard = ({
    name,
    given = [],
    taken = [],
    userImage,
    _id,
    ...rest
}) => {
    const { setCurrentUser } = useContext(provider);

    // Memoized calculations
    const totalGiven = useMemo(() => calculateTotal(given), [given]);
    const totalTaken = useMemo(() => calculateTotal(taken), [taken]);
    const totalBalance = useMemo(
        () => totalGiven - totalTaken,
        [totalGiven, totalTaken]
    );
    const balanceColor = useMemo(
        () => getBalanceColor(totalBalance),
        [totalBalance]
    );

    const handleNavigate = () => {
        setCurrentUser({
            name,
            given,
            taken,
            userImage,
            _id,
            totalGiven,
            totalTaken,
            ...rest,
        });
    };

    return (
        <div
            className="basicCard"
            onClick={handleNavigate}
            style={{
                background: `linear-gradient(90deg, rgba(255,255,255,1) 80%, ${balanceColor} 200%)`,
            }}
        >
            <div className="user">
                <span className="profilePicture">
                    {userImage ? (
                        <div className="profileImage">
                            <img
                                src={getCloudinaryUrl(userImage)}
                                alt="profile"
                                width="100%"
                            />
                        </div>
                    ) : (
                        <i className="fas fa-user-circle" />
                    )}
                </span>
                <span className="userName">{name}</span>
            </div>

            <div className="card_balance" style={{ color: balanceColor }}>
                {moneyFormate(totalBalance)}
                <i className="fa-solid fa-chevron-right" />
            </div>
        </div>
    );
};

export default React.memo(UserDetailsCard);
