import { BASE_URL, ENDPOINT } from "../constants";

export const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);

    const day = date.getDate(); // 17
    const month = date.getMonth() + 1; // 2 (months are 0-indexed)
    const year = date.getFullYear(); // 2023

    return `${day}/${month}/${year}`;
};

export const compareDate = (a, b) => {
    const first = new Date(a);
    const second = new Date(b);

    return first - second;
};

export const calculateTotal = (entries = []) =>
    entries.reduce(
        (acc, curr) => acc + (Number(curr.actualPrice) - Number(curr.paid)),
        0
    );

export const getBalanceColor = (balance) => {
    if (balance === 0) return "black";
    return balance > 0 ? "#006300" : "darkred";
};

export const getUrl = (id) => {
    if (id) {
        return `${BASE_URL}/${ENDPOINT}/${id}`;
    } else {
        return `${BASE_URL}/${ENDPOINT}`;
    }
};

export const isEmpty = (value) => {
    if (value == null) return true; // null or undefined

    if (typeof value === "string") return value.trim() === "";

    if (Array.isArray(value)) return value.length === 0;

    if (typeof value === "object") return Object.keys(value).length === 0;

    if (typeof value === "boolean") return !value;

    if (typeof value === "number") return isNaN(value) || value === 0;

    return false;
};

export function capitalize(word) {
    if (typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
