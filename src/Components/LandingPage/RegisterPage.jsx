import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { provider } from "../../Context/ContextPovider";
import useLoadingTimeout from "../../hooks/useLoadingTimeout";
import LoadingDots from "../LoadingDots";
import LineLoader from "../Common/LineLoader";
import ImageUpload from "../Common/ImageUpload";
import axios from "axios";
import { BASE_URL } from "../../constants";

const PageContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
        padding: 15px;
    }
    
    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const BackgroundPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%);
    pointer-events: none;
`;

const RegisterContainer = styled(motion.div)`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 40px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 2;
    max-height: 90vh;
    overflow-y: auto;
    
    @media (max-width: 768px) {
        max-width: 100%;
        padding: 30px 25px;
        border-radius: 20px;
        max-height: 95vh;
    }
    
    @media (max-width: 480px) {
        padding: 25px 20px;
        border-radius: 16px;
        margin: 0 5px;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 32px;
    
    @media (max-width: 768px) {
        margin-bottom: 25px;
    }
    
    @media (max-width: 480px) {
        margin-bottom: 20px;
    }
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    @media (max-width: 768px) {
        font-size: 24px;
    }
    
    @media (max-width: 480px) {
        font-size: 22px;
    }
`;

const Subtitle = styled.p`
    color: #4a5568;
    font-size: 16px;
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 15px;
    }
    
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
    position: relative;
    
    @media (max-width: 480px) {
        margin-bottom: 16px;
    }
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    color: #1a202c;
    font-size: 14px;
    font-weight: 600;
    transition: color 0.2s ease;
    text-align: left;
    
    @media (max-width: 480px) {
        font-size: 13px;
        margin-bottom: 6px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 16px;
    border: 2px solid ${(props) => (props.error ? "#e53e3e" : "#e2e8f0")};
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: #f8fafc;
    color: #1a202c;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #667eea;
        background: white;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    &::placeholder {
        color: #a0aec0;
    }

    &:disabled {
        background: #f7fafc;
        cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
        padding: 14px;
        font-size: 16px; /* Prevents zoom on iOS */
    }
    
    @media (max-width: 480px) {
        padding: 12px;
        border-radius: 10px;
    }
`;

const ErrorText = styled.div`
    color: #e53e3e;
    font-size: 13px;
    margin-top: 6px;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transform: ${(props) => (props.show ? "translateY(0)" : "translateY(-10px)")};
    transition: all 0.2s ease;
    
    @media (max-width: 480px) {
        font-size: 12px;
        margin-top: 4px;
    }
`;

const FormError = styled.div`
    color: #e53e3e;
    font-size: 14px;
    text-align: center;
    margin: 16px 0;
    padding: 12px;
    background: rgba(229, 62, 62, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(229, 62, 62, 0.2);
    opacity: ${(props) => (props.show ? 1 : 0)};
    transform: ${(props) => (props.show ? "translateY(0)" : "translateY(-10px)")};
    transition: all 0.3s ease;
    
    @media (max-width: 480px) {
        font-size: 13px;
        padding: 10px;
        margin: 12px 0;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 32px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        margin-top: 25px;
    }
    
    @media (max-width: 480px) {
        gap: 8px;
        margin-top: 20px;
    }
`;

const Button = styled.button`
    flex: 1;
    padding: 16px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    ${(props) =>
        props.primary
            ? `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
        }
        
        &:active {
            transform: translateY(0);
        }
    `
            : `
        background: #f7fafc;
        color: #4a5568;
        border: 2px solid #e2e8f0;
        
        &:hover {
            background: #edf2f7;
            border-color: #cbd5e0;
            transform: translateY(-2px);
        }
        
        &:active {
            transform: translateY(0);
        }
    `}

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    
    @media (max-width: 768px) {
        padding: 14px;
        font-size: 16px; /* Prevents zoom on iOS */
    }
    
    @media (max-width: 480px) {
        padding: 12px;
        border-radius: 10px;
        font-size: 15px;
    }
    
    /* Disable hover effects on touch devices */
    @media (hover: none) and (pointer: coarse) {
        &:hover {
            transform: none;
            box-shadow: ${(props) => props.primary ? "0 4px 20px rgba(102, 126, 234, 0.4)" : "none"};
        }
    }
`;

const BackLink = styled(motion.button)`
    background: none;
    border: none;
    color: #667eea;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;

    &:hover {
        color: #5a67d8;
        transform: translateX(-4px);
    }
    
    @media (max-width: 768px) {
        margin-bottom: 20px;
        font-size: 13px;
    }
    
    @media (max-width: 480px) {
        margin-bottom: 16px;
        font-size: 12px;
    }
    
    /* Disable hover effects on touch devices */
    @media (hover: none) and (pointer: coarse) {
        &:hover {
            transform: none;
        }
    }
`;

const ImageUploadContainer = styled.div`
    margin-top: 8px;
    
    @media (max-width: 480px) {
        margin-top: 6px;
    }
`;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = React.useState({ email: "" });
    const [confirm, setConfirm] = React.useState("");
    const { isLoading, error, setError, setIsLoading } = useContext(provider);
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
        setPayload((prev) => ({
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
        setPayload((prev) => ({
            ...prev,
            profile: null,
        }));
        setPreviewUrl(null);
        setFormErrors((prev) => ({
            ...prev,
            profile: "",
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload((prev) => ({
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

    const handleAddUser = (payload) => {
        const { name, age, email, password, profile } = payload;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile", profile);
        setError({ message: "", open: false });

        setIsLoading(true);
        const url = `${BASE_URL}/register/`;
        axios
            .post(url, formData)
            .then((res) => {
                setIsLoading(false);
                if (res.data.token) {
                    // Show success message and redirect to login
                    setError({
                        message: "Registration successful! Please sign in.",
                        open: true,
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else
                    setError({
                        message: "User has been already registered!",
                        open: true,
                    });
            })
            .catch((e) =>
                setError({
                    message: "Something went wrong please try again later!",
                    open: true,
                })
            )
            .finally(() => setIsLoading(false));
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
        <PageContainer>
            <BackgroundPattern />
            
            <RegisterContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <BackLink
                    onClick={() => navigate('/')}
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}
                >
                    ← Back to Sign In
                </BackLink>

                <Header>
                    <Title>Create Your Account</Title>
                    <Subtitle>Join us to start managing your finances</Subtitle>
                </Header>

                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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

                <FormError show={error.open}>
                    {error.message}
                </FormError>

                <ButtonGroup>
                    <Button onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                    <Button primary onClick={handleRegister} disabled={isLoading}>
                        {isLoading && (
                            <CircularProgress sx={{ color: "white" }} size={16} />
                        )}
                        Create Account
                    </Button>
                </ButtonGroup>

                {showLongerApiCallMessage && (
                    <LoadingDots title={title} message={message} />
                )}
                {isLoading && <LineLoader />}
            </RegisterContainer>
        </PageContainer>
    );
};

export default RegisterPage; 