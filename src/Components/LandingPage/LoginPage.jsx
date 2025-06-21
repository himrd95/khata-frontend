import React, { memo, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { provider } from "../../Context/ContextPovider";
import useLoadingTimeout from "../../hooks/useLoadingTimeout";
import LoadingDots from "../LoadingDots";
import LineLoader from "../Common/LineLoader";
import axios from "axios";
import { BASE_URL, TABS } from "../../constants";
import { isEmpty } from "../../utils/helpers";

const PageContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
`;

const BackgroundPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    gap: 60px;
    position: relative;
    z-index: 2;
    
    @media (max-width: 1024px) {
        gap: 40px;
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 40px;
        text-align: center;
    }
    
    @media (max-width: 480px) {
        gap: 30px;
        padding: 0 10px;
    }
`;

const LeftSection = styled(motion.div)`
    flex: 1;
    color: white;
    max-width: 500px;
    
    @media (max-width: 768px) {
        max-width: 100%;
        order: 2;
    }
    
    @media (max-width: 480px) {
        padding: 0 10px;
    }
`;

const HeroTitle = styled.h1`
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    @media (max-width: 768px) {
        font-size: clamp(2rem, 6vw, 2.5rem);
        margin-bottom: 1rem;
    }
    
    @media (max-width: 480px) {
        font-size: clamp(1.8rem, 7vw, 2.2rem);
    }
`;

const HeroSubtitle = styled.p`
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    margin-bottom: 2rem;
    line-height: 1.6;
    font-weight: 400;
    opacity: 0.9;
    
    @media (max-width: 768px) {
        font-size: clamp(1rem, 3vw, 1.1rem);
        margin-bottom: 1.5rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.95rem;
        margin-bottom: 1.2rem;
    }
`;

const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const FeatureItem = styled(motion.li)`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    opacity: 0.9;
    
    &:before {
        content: "✓";
        margin-right: 12px;
        font-weight: bold;
        color: #4ade80;
    }
    
    @media (max-width: 1024px) {
        font-size: 1rem;
    }
`;

const LoginContainer = styled(motion.div)`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 2;
    
    @media (max-width: 768px) {
        max-width: 100%;
        order: 1;
        padding: 30px 25px;
        border-radius: 20px;
    }
    
    @media (max-width: 480px) {
        padding: 25px 20px;
        border-radius: 16px;
        margin: 0 10px;
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

const Title = styled.h2`
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
    flex-direction: column;
    gap: 12px;
    margin-top: 32px;
    
    @media (max-width: 768px) {
        margin-top: 25px;
        gap: 10px;
    }
    
    @media (max-width: 480px) {
        margin-top: 20px;
        gap: 8px;
    }
`;

const PrimaryButton = styled.button`
    width: 100%;
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
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }
    }
`;

const SecondaryButton = styled.button`
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
    border: 2px solid #667eea;
    backdrop-filter: blur(10px);
    
    &:hover {
        background: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
        transform: translateY(0);
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
            box-shadow: none;
        }
    }
`;

const FloatingAnimation = styled(motion.div)`
    position: absolute;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    pointer-events: none;
    
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
    
    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
    }
`;

const LoginPage = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = React.useState({ email: "", password: "" });
    const { isLoading, error, setError, setAdminPannel, setIsLoading, adminPannel, setActiveTab } = useContext(provider);
    const { showLongerApiCallMessage, title, message } = useLoadingTimeout();
    const [formErrors, setFormErrors] = React.useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (!isEmpty(adminPannel.token)) {
            setActiveTab(TABS.HOME);
            navigate('/dashboard');
        }
    }, [adminPannel.token, navigate, setActiveTab]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload((prev) => ({
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

    const handleLogin = useCallback(
        (payload) => {
            setError({ message: "", open: false });
            setIsLoading(true);
            const url = `${BASE_URL}/login/`;
            axios
                .post(url, { ...payload })
                .then((res) => {
                    setIsLoading(false);
                    if (res.data.token) {
                        setAdminPannel(res.data);
                        navigate('/dashboard');
                    } else
                        setError({ message: "Wrong credentials!", open: true });
                })
                .catch((e) =>
                    setError({ message: "Wrong credentials!", open: true })
                )
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [setAdminPannel, setError, setIsLoading, navigate]
    );

    const handleLoginClick = () => {
        if (!validateForm()) {
            return;
        }
        handleLogin(payload);
    };

    const features = [
        "Smart expense tracking with AI insights",
        "Beautiful visual analytics and reports",
        "Secure & private data encryption",
        "Lightning fast performance"
    ];

    return (
        <PageContainer>
            <BackgroundPattern />
            
            {/* Floating animations */}
            <FloatingAnimation
                style={{
                    top: '20%',
                    left: '10%',
                }}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <FloatingAnimation
                style={{
                    top: '60%',
                    right: '15%',
                }}
                animate={{
                    y: [0, 20, 0],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <ContentWrapper>
                <LeftSection
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <HeroTitle>
                        Take Control of Your
                        <br />
                        Financial Life
                    </HeroTitle>
                    <HeroSubtitle>
                        The simplest way to track expenses, manage budgets, and achieve your financial goals. 
                        Start your journey to financial freedom today.
                    </HeroSubtitle>
                    
                    <FeatureList>
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            >
                                {feature}
                            </FeatureItem>
                        ))}
                    </FeatureList>
                </LeftSection>

                <LoginContainer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Header>
                        <Title>Welcome Back</Title>
                        <Subtitle>Sign in to your account to continue</Subtitle>
                    </Header>

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
                            placeholder="Enter your password"
                            onChange={handleChange}
                            error={!!formErrors.password}
                        />
                        <ErrorText show={!!formErrors.password}>
                            {formErrors.password}
                        </ErrorText>
                    </FormGroup>

                    <FormError show={error.open}>
                        {error.message}
                    </FormError>

                    <ButtonGroup>
                        <PrimaryButton onClick={handleLoginClick} disabled={isLoading}>
                            {isLoading && (
                                <CircularProgress sx={{ color: "white" }} size={16} />
                            )}
                            Sign In
                        </PrimaryButton>
                        <SecondaryButton onClick={() => navigate('/register')}>
                            Create New Account
                        </SecondaryButton>
                    </ButtonGroup>

                    {showLongerApiCallMessage && (
                        <LoadingDots title={title} message={message} />
                    )}
                    {isLoading && <LineLoader />}
                </LoginContainer>
            </ContentWrapper>
        </PageContainer>
    );
};

export default memo(LoginPage); 