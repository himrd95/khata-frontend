import React, { useCallback, useContext, useEffect, useMemo } from "react";
import eventBus from "../../utils/eventBus";
import { FaEllipsisV } from "react-icons/fa";

import SimpleDialog from "../Modal";
import { Alert, Button, Snackbar } from "@mui/material";
import UpdateUser from "../Table/UpdateUser";
import { provider } from "../../Context/ContextPovider";
import { EVENTS, moneyFormate } from "../../constants";
import DeleteConfirmation from "../Contents/DeleteConfirmation";
import { capitalize } from "../../utils/helpers";

const DataCard = ({ data, title, total, bgColor, name, updateRequest }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [content, setContent] = React.useState("");
    const { message, addTransaction, setAddTransaction, setIsLoading } =
        useContext(provider);

    const mode = useMemo(() => title.split(" ")[0]?.toLowerCase(), [title]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setAddTransaction(false);
    }, [setAddTransaction]);

    const handleUpdate = useCallback(
        (payload, _, edit, index, remove, _mode) => {
            const updatedData = [...data];
            const d = new Date();
            const date = `${d.getDate()}/${
                d.getMonth() + 1
            }/${d.getFullYear()}`;

            const newData = { ...payload, date };
            if (edit) {
                updatedData[index] = newData;
            } else {
                updatedData.push(newData);
            }

            const sum = updatedData.reduce(
                (acc, item) =>
                    acc + Number(item.actualPrice) - Number(item.paid),
                0
            );

            updateRequest({
                balance: sum,
                [_mode ?? mode]: updatedData,
            });
            setIsLoading(true);
            handleClose();
        },
        [data, handleClose, mode, setIsLoading, updateRequest]
    );

    const editAndUpdate = useCallback(
        (row, index, remove, _mode) => {
            console.log(index);
            if (remove) {
                const transactionAmount = moneyFormate(data[index].actualPrice);
                const confirmationMsg = `Do you really want to remove the transaction of ${transactionAmount}?`;
                setContent(
                    <DeleteConfirmation
                        label={confirmationMsg}
                        handleClose={handleClose}
                        index={index}
                        mode={_mode}
                        transactionAmount={transactionAmount}
                    />
                );
            } else {
                setContent(
                    <UpdateUser
                        handleClose={handleClose}
                        handleUpdate={handleUpdate}
                        row={row}
                        edit={true}
                        index={index}
                        mode={mode}
                        data={data}
                    />
                );
            }
        },
        [data, handleClose, handleUpdate, mode]
    );

    const handleUpdateAdd = useCallback(
        (row) => {
            if (isOpen) {
                return;
            }

            setContent(
                <UpdateUser
                    handleClose={handleClose}
                    handleUpdate={handleUpdate}
                    row={row}
                    data={data}
                />
            );
            setAddTransaction(true);
        },
        [data, handleClose, handleUpdate, isOpen, setAddTransaction]
    );

    const userActions = (row, i) => {
        setIsOpen(true);
        const mode = title.split(" ")[0];
        setContent(
            <div className="editModal">
                <Button
                    variant="text"
                    fullWidth
                    onClick={() => editAndUpdate(row, i, false, mode)}
                >
                    Edit trasection
                </Button>
                <Button
                    variant="text"
                    fullWidth
                    onClick={() => editAndUpdate(row, i, true, mode)}
                >
                    Remove trasection
                </Button>
                <Button variant="text" onClick={handleClose}>
                    Do nothing
                </Button>
            </div>
        );
    };

    useEffect(() => {
        eventBus.on(EVENTS.ADD_NEW_TRANSACTION, () => {
            handleUpdateAdd({ row: data });
        });

        return () => eventBus.remove(EVENTS.ADD_NEW_TRANSACTION);
    }, [data, handleUpdateAdd]);

    return (
        <>
            {data?.length !== 0 ? (
                <div className="basicCard transaction">
                    <div style={{ background: bgColor }} className="header">
                        <span className="title">{title}</span>
                        <span className="title">{moneyFormate(total)}</span>
                    </div>

                    <div className="allTransaction">
                        {data?.map((data, i) => (
                            <div className="row" key={data.date + data.purpose}>
                                <div className="dateAndPurpose">
                                    <span className="date">{data.date}</span>
                                    <span className="purpose">
                                        {capitalize(data.purpose)}
                                    </span>
                                </div>
                                <div
                                    className="actualPrice"
                                    onClick={() =>
                                        userActions({ row: data }, i)
                                    }
                                >
                                    <span className="actual-price">
                                        {moneyFormate(data.actualPrice)}
                                    </span>
                                    <FaEllipsisV />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {message}!
                </Alert>
            </Snackbar>

            {isOpen ? (
                <SimpleDialog
                    isOpen={isOpen}
                    handleClose={handleClose}
                    content={content}
                />
            ) : null}

            {addTransaction ? (
                <SimpleDialog
                    isOpen={addTransaction}
                    handleClose={handleClose}
                    content={content}
                />
            ) : null}
        </>
    );
};

export default React.memo(DataCard);
