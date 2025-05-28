import React, {
    createContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";
import { calculateTotal, isEmpty } from "../utils/helpers";

export const provider = createContext();

const preToken = JSON.parse(localStorage.getItem("khata-2.0")) || {
    token: "",
    admin: {},
    voice: false,
    totalBalance: 0,
};
const ContextPovider = ({ children }) => {
    const [state, setState] = useState(false);
    const [users, setUsers] = React.useState([]);
    const [refreshProfile, setRefreshProfile] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState({ message: "", open: false });
    const [loginPopup, setLoginPopup] = useState(false);
    const [adminPannel, setAdminPannel] = useState(preToken);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isModalLoading, setIsModalLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [addTransaction, setAddTransaction] = useState(false);
    const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
    const [totalAmount, setTotalAmount] = useState({ given: 0, taken: 0 });
    const [totalGivenByAdmin, setTotalGivenByAdmin] = useState(0);
    const [totalTakenByAdmin, setTotalTakenByAdmin] = useState(0);
    const [balancesByUser, setBalancesByUser] = useState([]);

    const totalBalnce = useMemo(() => {
        if (!isEmpty(currentUser) && currentUser.given && currentUser.taken) {
            // Calculate for the selected user
            return totalAmount.given - totalAmount.taken;
        }
        // Calculate for all users
        let given = 0;
        let taken = 0;
        users.forEach((user) => {
            given += calculateTotal(user.given);
            taken += calculateTotal(user.taken);
        });
        setTotalGivenByAdmin(given);
        setTotalTakenByAdmin(taken);
        return given - taken;
    }, [currentUser, totalAmount.given, totalAmount.taken, users]);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        const updatedAdminPannel = isEmpty(currentUser)
            ? { ...adminPannel, totalBalance: totalBalnce }
            : { ...adminPannel };
        localStorage.setItem("khata-2.0", JSON.stringify(updatedAdminPannel));
    }, [adminPannel, currentUser, totalBalnce]);

    const handleState = (msg) => {
        setState(!state);
        setMessage(msg);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoginPopup(false);
        }, 1000);
    }, [loginPopup]);

    useEffect(() => {
        if (currentUser) {
            setTotalAmount({
                given: calculateTotal(currentUser.given),
                taken: calculateTotal(currentUser.taken),
            });
        }
    }, [currentUser]);

    const showSnackbar = useCallback((message, severity = "success") => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    }, []);

    const onSnackBarClose = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    const value = {
        state,
        handleState,
        message,
        setMessage,
        adminPannel,
        setAdminPannel,
        loginPopup,
        setLoginPopup,
        isLoading,
        setIsLoading,
        isModalLoading,
        setIsModalLoading,
        error,
        setError,
        currentUser,
        setCurrentUser,
        addTransaction,
        setAddTransaction,
        users,
        setUsers,
        shouldFetchUsers,
        setShouldFetchUsers,
        totalAmount,
        setTotalAmount,
        snackbar,
        showSnackbar,
        onSnackBarClose,
        refreshProfile,
        setRefreshProfile,
        totalBalnce,
        totalGivenByAdmin,
        totalTakenByAdmin,
        balancesByUser,
        setBalancesByUser,
    };
    return <provider.Provider value={value}>{children}</provider.Provider>;
};

export default ContextPovider;
