import React, { memo, useContext, useState } from "react";
import "./UpdateUser.css";
import CustomSelect from "./CustomSelectBox";
import { provider } from "../../Context/ContextPovider";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";
import { calculateTotal, capitalize } from "../../utils/helpers";
import LineLoader from "../Common/LineLoader";

const UpdateUser = ({ handleClose, handleUpdate, edit, index, mode, data }) => {
    const { currentUser, setTotalAmount, isModalLoading } =
        useContext(provider);
    const { name, _id: id } = currentUser;
    const { putRequest } = useMakeApiCalls();

    const [selectedMode, setSelectedMode] = useState(mode);

    // Get today's date in YYYY-MM-DD format for the date input
    const today = new Date().toISOString().split("T")[0];

    // Format date from DD/MM/YYYY to YYYY-MM-DD for the date input
    const formatDateForInput = (dateStr) => {
        if (!dateStr) return today;

        const parts = dateStr.split("/");
        if (parts.length !== 3) return today;

        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
            2,
            "0"
        )}`;
    };

    const initState = edit
        ? {
              purpose: data[index]?.purpose || "",
              actualPrice: data[index]?.actualPrice || "",
              paid: data[index]?.paid || 0,
              date: formatDateForInput(data[index]?.date) || today,
          }
        : {
              purpose: "",
              actualPrice: "",
              paid: 0,
              date: today,
          };

    const [payload, setPayLoad] = useState(initState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayLoad((prev) => ({ ...prev, [name]: value }));
    };

    const onSelect = (value) => {
        setSelectedMode(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert the date from YYYY-MM-DD to DD/MM/YYYY format
        const dateParts = payload.date.split("-");
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        const newData = {
            ...payload,
            date: formattedDate,
        };

        const updatedUser = { ...currentUser };

        // Remove from previous mode if mode changed
        if (edit && selectedMode !== mode) {
            updatedUser[mode].splice(index, 1);
            updatedUser[selectedMode].push(newData);
        } else if (edit) {
            updatedUser[mode][index] = newData;
        } else {
            updatedUser[selectedMode].push(newData);
        }

        // Recalculate totals
        const totalGiven = calculateTotal(updatedUser.given);
        const totalTaken = calculateTotal(updatedUser.taken);
        const balance = totalGiven - totalTaken;

        const finalData = { ...updatedUser, balance };
        setTotalAmount({ given: totalGiven, taken: totalTaken });

        const msg = `${currentUser.name}'s account is successfully updated`;
        delete finalData.userImage;
        await putRequest(id, finalData, msg, {});
        handleClose();
    };

    return (
        <div className="apple-form-container">
            <form onSubmit={handleSubmit} className="apple-form">
                <h2>Update {capitalize(name)}'s account</h2>

                <div className="apple-form-group">
                    <label>Purpose</label>
                    <input
                        type="text"
                        name="purpose"
                        value={payload.purpose}
                        onChange={handleChange}
                        placeholder="Ex: Rent, Salary"
                        required
                    />
                </div>

                <div className="apple-form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="actualPrice"
                        value={payload.actualPrice}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        required
                    />
                </div>

                <div className="apple-form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={payload.date}
                        onChange={handleChange}
                        max={today}
                        required
                    />
                </div>

                <CustomSelect
                    options={[
                        { label: `Given to ${name}`, value: "given" },
                        { label: `Taken from ${name}`, value: "taken" },
                    ]}
                    onChange={onSelect}
                    selected={selectedMode}
                />

                <div className="apple-buttons">
                    <button
                        type="button"
                        className="cancel"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="update">
                        Update
                    </button>
                </div>
            </form>

            {isModalLoading && <LineLoader />}
        </div>
    );
};

export default memo(UpdateUser);
