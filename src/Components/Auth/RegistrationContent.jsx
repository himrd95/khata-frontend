import React, { useContext, useState } from "react";
import Styled from "styled-components";
import { provider } from "../../Context/ContextPovider";
import { CircularProgress } from "@mui/material";
import useLoadingTimeout from "../../hooks/useLoadingTimeout";
import LoadingDots from "../LoadingDots";
import LineLoader from "../Common/LineLoader";
import ImageUpload from "../Common/ImageUpload";

const Container = Styled.div`
    padding: 24px;
    text-align: center;
    width: 100%;
    max-width: 420px;
    margin: auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Title = Styled.h2`
    color: #1a1a1a;
    font-size: 24px;
    margin: 0 0 20px 0;
    font-weight: 600;
    letter-spacing: -0.5px;
`;

const FormGroup = Styled.div`
    margin-bottom: 16px;
    text-align: left;
    animation: slideUp 0.3s ease-out;
    animation-fill-mode: both;
    position: relative;

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &:nth-child(2) { animation-delay: 0.05s; }
    &:nth-child(3) { animation-delay: 0.1s; }
    &:nth-child(4) { animation-delay: 0.15s; }
    &:nth-child(5) { animation-delay: 0.2s; }
    &:nth-child(6) { animation-delay: 0.25s; }
    &:nth-child(7) { animation-delay: 0.3s; }
`;

const Label = Styled.label`
    display: block;
    margin-bottom: 6px;
    color: #1a1a1a;
    font-size: 13px;
    font-weight: 500;
    transition: color 0.2s ease;

    &:has(input:focus) {
        color: #1890ff;
    }
`;

const Input = Styled.input`
    width: 100%;
    padding: 10px 12px;
    border: 2px solid ${(props) => (props.error ? "#ff4d4f" : "#e8e8e8")};
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
    background: #fafafa;
    color: #1a1a1a;

    &:focus {
        outline: none;
        border-color: #1890ff;
        background: white;
        box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.1);
    }

    &::placeholder {
        color: #999;
    }

    &:disabled {
        background: #f5f5f5;
        cursor: not-allowed;
    }
`;

const ErrorText = Styled.div`
    color: #ff4d4f;
    font-size: 13px;
    position: absolute;
    left: 0;
    right: 0;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transform: ${(props) =>
        props.show ? "translateY(0)" : "translateY(-10px)"};
    transition: all 0.2s ease;
    pointer-events: none;
    animation: ${(props) => (props.show ? "shake 0.3s ease-in-out" : "none")};

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        75% { transform: translateX(4px); }
    }
`;

const FormErrorContainer = Styled.div`
    position: relative;
    height: ${(props) => (props.show ? "20px" : "0")};
    margin: ${(props) => (props.show ? "12px 0" : "0")};
    transition: all 0.3s ease;
    overflow: hidden;
`;

const FormError = Styled.div`
    color: #ff4d4f;
    font-size: 13px;
    text-align: center;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transform: ${(props) =>
        props.show ? "translateY(0)" : "translateY(-10px)"};
    transition: all 0.3s ease;
`;

const ButtonGroup = Styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 24px;
`;

const Button = Styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 100px;

    ${(props) =>
        props.primary
            ? `
        background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
        color: white;
        &:hover {
            background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(24, 144, 255, 0.3);
        }
        &:active {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
        }
    `
            : `
        background: #f5f5f5;
        color: #1a1a1a;
        &:hover {
            background: #e8e8e8;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        &:active {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
    `}

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const ImageUploadContainer = Styled.div`
    margin-top: 4px;
    animation: fadeIn 0.3s ease-out;
`;

const RegistrationContent = ({ handleClose, handleAddUser }) => {
    const [payload, setPayLoad] = React.useState({ email: "" });
    const [confirm, setConfirm] = React.useState("");
    const { isLoading, error, setError } = useContext(provider);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formErrors, setFormErrors] = useState({
        name: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: "",
        profile: "",
    });

    const { showLongerApiCallMessage, title, message } = useLoadingTimeout();

    const validateName = (name) => {
        if (!name) return "Name is required";
        if (name.length < 2) return "Name must be at least 2 characters";
        if (name.length > 50) return "Name must be less than 50 characters";
        if (!/^[a-zA-Z\s]*$/.test(name))
            return "Name can only contain letters and spaces";
        return "";
    };

    const validateAge = (age) => {
        if (!age) return "Age is required";
        const numAge = Number(age);
        if (isNaN(numAge)) return "Age must be a number";
        if (numAge < 13) return "You must be at least 13 years old";
        if (numAge > 120) return "Please enter a valid age";
        return "";
    };

    const validateEmail = (email) => {
        if (!email) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 6)
            return "Password must be at least 6 characters";
        if (!/(?=.*[a-z])/.test(password))
            return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(password))
            return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(password))
            return "Password must contain at least one number";
        return "";
    };

    const validateConfirmPassword = (confirm, password) => {
        if (!confirm) return "Please confirm your password";
        if (confirm !== password) return "Passwords do not match";
        return "";
    };

    const handleImageSelect = (file, preview) => {
        setPayLoad((prev) => ({
            ...prev,
            profile: file,
        }));
        setPreviewUrl(preview);
        setFormErrors((prev) => ({
            ...prev,
            profile: "",
        }));
    };

    const handleImageRemove = () => {
        setPayLoad((prev) => ({
            ...prev,
            profile: null,
        }));
        setPreviewUrl(null);
        setFormErrors((prev) => ({
            ...prev,
            profile: "",
        }));
    };

    const handlechange = (e) => {
        const { name, value } = e.target;
        setPayLoad((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validate field on change
        let error = "";
        switch (name) {
            case "name":
                error = validateName(value);
                break;
            case "age":
                error = validateAge(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "password":
                error = validatePassword(value);
                if (confirm) {
                    setFormErrors((prev) => ({
                        ...prev,
                        confirmPassword: validateConfirmPassword(
                            confirm,
                            value
                        ),
                    }));
                }
                break;
            default:
                break;
        }

        setFormErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleConfirmChange = (e) => {
        const value = e.target.value;
        setConfirm(value);
        setFormErrors((prev) => ({
            ...prev,
            confirmPassword: validateConfirmPassword(value, payload.password),
        }));
    };

    const validateForm = () => {
        const errors = {
            name: validateName(payload.name),
            age: validateAge(payload.age),
            email: validateEmail(payload.email),
            password: validatePassword(payload.password),
            confirmPassword: validateConfirmPassword(confirm, payload.password),
            profile: "", // Profile is now optional
        };

        setFormErrors(errors);
        return !Object.values(errors).some((error) => error !== "");
    };

    const handleRegister = () => {
        if (!validateForm()) {
            setError({
                message: "Please fix the errors in the form",
                open: true,
            });
            return;
        }
        handleAddUser(payload);
    };

    return (
        <Container>
            <Title>Create Your Account</Title>

            <FormGroup>
                <Label>Name</Label>
                <Input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    onChange={handlechange}
                    error={!!formErrors.name}
                />
                <ErrorText show={!!formErrors.name}>
                    {formErrors.name}
                </ErrorText>
            </FormGroup>

            <FormGroup>
                <Label>Age</Label>
                <Input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    onChange={handlechange}
                    error={!!formErrors.age}
                />
                <ErrorText show={!!formErrors.age}>{formErrors.age}</ErrorText>
            </FormGroup>

            <FormGroup>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    onChange={handlechange}
                    error={!!formErrors.email}
                />
                <ErrorText show={!!formErrors.email}>
                    {formErrors.email}
                </ErrorText>
            </FormGroup>

            <FormGroup>
                <Label>Password</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    onChange={handlechange}
                    error={!!formErrors.password}
                />
                <ErrorText show={!!formErrors.password}>
                    {formErrors.password}
                </ErrorText>
            </FormGroup>

            <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                    type="password"
                    name="confirm"
                    placeholder="Confirm your password"
                    onChange={handleConfirmChange}
                    error={!!formErrors.confirmPassword}
                />
                <ErrorText show={!!formErrors.confirmPassword}>
                    {formErrors.confirmPassword}
                </ErrorText>
            </FormGroup>

            <FormGroup>
                <Label>Profile Picture (Optional)</Label>
                <ImageUploadContainer>
                    <ImageUpload
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                        previewUrl={previewUrl}
                        width="150px"
                        height="150px"
                        placeholderText="Choose Profile Picture (Optional)"
                        required={false}
                        error={formErrors.profile}
                    />
                </ImageUploadContainer>
                <ErrorText show={!!formErrors.profile}>
                    {formErrors.profile}
                </ErrorText>
            </FormGroup>

            <FormErrorContainer show={error.open}>
                <FormError show={error.open}>{error.message}</FormError>
            </FormErrorContainer>

            <ButtonGroup>
                <Button onClick={handleClose}>Cancel</Button>
                <Button primary onClick={handleRegister} disabled={isLoading}>
                    {isLoading && (
                        <CircularProgress sx={{ color: "white" }} size={16} />
                    )}
                    Sign up
                </Button>
            </ButtonGroup>

            {showLongerApiCallMessage && (
                <LoadingDots title={title} message={message} />
            )}
            {isLoading && <LineLoader />}
        </Container>
    );
};

export default RegistrationContent;
