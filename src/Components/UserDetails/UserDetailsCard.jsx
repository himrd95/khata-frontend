import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { provider } from "../../Context/ContextPovider";
import { BASE_URL, moneyFormate } from "../../constants";
import "./UserDetailsCard.css";
import { calculateTotal, getBalanceColor } from "../../utils/helpers";

const UserDetailsCard = ({
    name,
    given = [],
    taken = [],
    userImage,
    _id,
    ...rest
}) => {
    const { setCurrentUser, message } = useContext(provider);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        if (message) setShowSnackbar(true);
    }, [message]);

    const handleClose = () => setShowSnackbar(false);

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
        navigate(`${_id}`);
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
                                src={`${BASE_URL}/${userImage}`}
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

            <Snackbar
                open={showSnackbar}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {message}!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default React.memo(UserDetailsCard);
