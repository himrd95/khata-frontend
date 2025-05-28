import React, { useContext, useMemo, useEffect } from "react";
import { provider } from "../../Context/ContextPovider";
import { moneyFormate } from "../../constants";
import "./UserDetailsCard.css";
import { calculateTotal, getBalanceColor } from "../../utils/helpers";
import ProfileImage from "../Common/ProfileImage";
import { FaChevronRight } from "react-icons/fa";

const UserDetailsCard = ({
    name,
    given = [],
    taken = [],
    userImage,
    _id,
    ...rest
}) => {
    const { setCurrentUser, setBalancesByUser } = useContext(provider);

    // Memoized calculations
    const totalGiven = useMemo(() => calculateTotal(given), [given]);
    const totalTaken = useMemo(() => calculateTotal(taken), [taken]);
    const totalBalance = useMemo(
        () => totalGiven - totalTaken,
        [totalGiven, totalTaken]
    );

    useEffect(() => {
        setBalancesByUser((prev) => {
            const idx = prev.findIndex((u) => u.name === name);
            if (idx !== -1) {
                // Update existing user
                return prev.map((u, i) =>
                    i === idx ? { ...u, totalBalance } : u
                );
            }
            // Add new user
            return [...prev, { name, totalBalance }];
        });
    }, [name, setBalancesByUser, totalBalance]);

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
                    <ProfileImage src={userImage} className="profileImage" />
                </span>
                <span className="userName">{name}</span>
            </div>

            <div className="card_balance" style={{ color: balanceColor }}>
                {moneyFormate(totalBalance)}
                <FaChevronRight />
            </div>
        </div>
    );
};

export default React.memo(UserDetailsCard);
