import React, {
    createContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";
import { calculateTotal, isEmpty } from "../utils/helpers";
import { useLocation } from "react-router";
import { TABS } from "../constants";

export const provider = createContext();

const preToken = JSON.parse(localStorage.getItem("khata-2.0")) || {
    token: "",
    admin: {},
    voice: false,
    totalBalance: 0,
};

const ContextPovider = ({ children }) => {
    // UI and app state
    const [state, setState] = useState(false);
    const [users, setUsers] = useState([]);
    const [refreshProfile, setRefreshProfile] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState({ message: "", open: false });
    const [loginPopup, setLoginPopup] = useState(false);
    const [adminPannel, setAdminPannel] = useState(preToken);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [addTransaction, setAddTransaction] = useState(false);
    const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
    const [totalAmount, setTotalAmount] = useState({ given: 0, taken: 0 });
    const [totalGivenByAdmin, setTotalGivenByAdmin] = useState(0);
    const [totalTakenByAdmin, setTotalTakenByAdmin] = useState(0);
    const [balancesByUser, setBalancesByUser] = useState([]);
    const [activeTab, setActiveTab] = useState(TABS.HOME);
    const path = useLocation();

    // Calculate total balance (for admin or current user)
    const totalBalnce = useMemo(() => {
        if (!isEmpty(currentUser) && currentUser.given && currentUser.taken) {
            // Selected user
            return totalAmount.given - totalAmount.taken;
        }
        if (path.pathname === "/profile" && isEmpty(users)) {
            return adminPannel.totalBalance;
        }
        // All users
        let given = 0;
        let taken = 0;
        users.forEach((user) => {
            given += calculateTotal(user.given);
            taken += calculateTotal(user.taken);
        });
        setTotalGivenByAdmin(given);
        setTotalTakenByAdmin(taken);
        return given - taken;
    }, [
        currentUser,
        path.pathname,
        users,
        totalAmount.given,
        totalAmount.taken,
        adminPannel.totalBalance,
    ]);

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Persist admin panel state in localStorage
    useEffect(() => {
        if (path.pathname === "/profile") return;
        const updatedAdminPannel = isEmpty(currentUser)
            ? { ...adminPannel, totalBalance: totalBalnce }
            : { ...adminPannel };
        localStorage.setItem("khata-2.0", JSON.stringify(updatedAdminPannel));
    }, [adminPannel, currentUser, path.pathname, totalBalnce]);

    // Toggle state and set message
    const handleState = useCallback((msg) => {
        setState((prev) => !prev);
        setMessage(msg);
    }, []);

    // Auto-close login popup
    useEffect(() => {
        if (!loginPopup) return;
        const timer = setTimeout(() => setLoginPopup(false), 1000);
        return () => clearTimeout(timer);
    }, [loginPopup]);

    // Update totalAmount when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setTotalAmount({
                given: calculateTotal(currentUser.given),
                taken: calculateTotal(currentUser.taken),
            });
        }
    }, [currentUser]);

    // Snackbar helpers
    const showSnackbar = useCallback((message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    }, []);
    const onSnackBarClose = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    // Context value
    const value = useMemo(
        () => ({
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
            setBalancesByUser,activeTab, setActiveTab
        }),
        [
            state,
            handleState,
            message,
            adminPannel,
            loginPopup,
            isLoading,
            isModalLoading,
            error,
            currentUser,
            addTransaction,
            users,
            shouldFetchUsers,
            totalAmount,
            snackbar,
            showSnackbar,
            onSnackBarClose,
            refreshProfile,
            totalBalnce,
            totalGivenByAdmin,
            totalTakenByAdmin,
            balancesByUser,
            activeTab,
            setActiveTab,
        ]
    );

    return <provider.Provider value={value}>{children}</provider.Provider>;
};

export default ContextPovider;
