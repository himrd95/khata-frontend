import React, { memo, useContext } from "react";
import Styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { provider } from "../../Context/ContextPovider";
import useLoadingTimeout from "../../hooks/useLoadingTimeout";
import LoadingDots from "../LoadingDots";
import LineLoader from "../Common/LineLoader";

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
	transform: ${(props) => (props.show ? "translateY(0)" : "translateY(-10px)")};
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
	transform: ${(props) => (props.show ? "translateY(0)" : "translateY(-10px)")};
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

const LoginContent = ({ handleClose, handleLogin }) => {
    const [payload, setPayLoad] = React.useState({ email: "" });
    const { isLoading, error } = useContext(provider);
    const { showLongerApiCallMessage, title, message } = useLoadingTimeout();
    const [formErrors, setFormErrors] = React.useState({
        email: "",
        password: "",
    });

    const validateEmail = (email) => {
        if (!email) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        return "";
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
            case "email":
                error = validateEmail(value);
                break;
            case "password":
                error = validatePassword(value);
                break;
            default:
                break;
        }

        setFormErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const validateForm = () => {
        const errors = {
            email: validateEmail(payload.email),
            password: validatePassword(payload.password),
        };

        setFormErrors(errors);
        return !Object.values(errors).some((error) => error !== "");
    };

    const handleLoginClick = () => {
        if (!validateForm()) {
            return;
        }
        handleLogin(payload);
    };

    return (
        <Container>
            <Title>Welcome Back</Title>

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
                    placeholder="Enter your password"
                    onChange={handlechange}
                    error={!!formErrors.password}
                />
                <ErrorText show={!!formErrors.password}>
                    {formErrors.password}
                </ErrorText>
            </FormGroup>

            <FormErrorContainer show={error.open}>
                <FormError show={error.open}>{error.message}</FormError>
            </FormErrorContainer>

            <ButtonGroup>
                <Button onClick={handleClose}>Cancel</Button>
                <Button primary onClick={handleLoginClick} disabled={isLoading}>
                    {isLoading && (
                        <CircularProgress sx={{ color: "white" }} size={16} />
                    )}
                    Log in
                </Button>
            </ButtonGroup>

            {showLongerApiCallMessage && (
                <LoadingDots title={title} message={message} />
            )}
            {isLoading && <LineLoader />}
        </Container>
    );
};

export default memo(LoginContent);
