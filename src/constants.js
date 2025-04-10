export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const ENDPOINT = "users";

export const EVENTS = {
    ADD_NEW_USER: "add-new-user",
    ADD_NEW_TRANSACTION: "add-new-transaction",
    OPEN_USER: "open-user",
    REFRESH_USER: "refresh-user",
    DELETE_USER: "delete-user",
};

export const moneyFormate = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        maximumSignificantDigits: 3,
    }).format(amount);
};

export const COLORS = {
    GIVEN_HEADER_BG:
        "linear-gradient(2700deg,rgb(90, 250, 143) 0%,rgb(189, 252, 212) 100%)",
    TAKEN_HEADER_BG:
        "linear-gradient(2700deg,  #fa5a5a 0%,rgb(248, 155, 155) 100%)",
};
