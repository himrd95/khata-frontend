import { Button } from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { BASE_URL } from "../../constants";
import { provider } from "../../Context/ContextPovider";
import SimpleDialog from "../Modal";
import { SuccessPopupContent } from "../SuccessPopupContent";
import LoginContent from "./LoginContent";
import "./Registration.css";
import RegistrationContent from "./RegistrationContent";
import {
    HeroSection,
    ContentWrapper,
    Title,
    Subtitle,
    BottomSection,
    LoginText,
    TitleWrapper,
    LottieWrapper,
} from "./Registration.styles";

const Registration = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const { loginPopup, setAdminPannel, setIsLoading, setError } =
        useContext(provider);

    const handleClose = () => {
        setIsOpen(false);
    };

    const successPopup = () => {
        setContent(<SuccessPopupContent handleLoginModal={handleLoginModal} />);
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
                    successPopup();
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

    const handleRegistrationModal = () => {
        setError({ message: "", open: false });
        setIsOpen(true);
        setContent(
            <RegistrationContent
                handleClose={handleClose}
                handleAddUser={handleAddUser}
            />
        );
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
                        handleClose();
                    } else
                        setError({ message: "Wrong credentials!", open: true });
                })
                .catch((e) =>
                    setError({ message: "Wrong credentials!", open: true })
                )
                .finally(() => setIsLoading(false));
        },
        [setAdminPannel, setError, setIsLoading]
    );

    const handleLoginModal = useCallback(() => {
        setError({ message: "", open: false });
        setIsOpen(true);
        setContent(
            <LoginContent handleClose={handleClose} handleLogin={handleLogin} />
        );
    }, [handleLogin, setError]);

    React.useEffect(() => {
        if (loginPopup) {
            handleLoginModal();
        }
    }, [handleLoginModal, loginPopup]);

    return (
        <HeroSection>
            <ContentWrapper>
                <LottieWrapper>
                    <lottie-player
                        src="https://lottie.host/3adaa1df-5724-4165-babe-db6555db2952/w2HInrNsTh.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    />
                </LottieWrapper>
                <TitleWrapper>
                    <Title>Tired of managing your daily expenses?</Title>
                    <Subtitle>Here's the solution. So let's</Subtitle>
                </TitleWrapper>
                <BottomSection>
                    <Button
                        onClick={handleRegistrationModal}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            padding: "12px 32px",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            borderRadius: "16px",
                            textTransform: "none",
                            fontFamily: "'Kanit', sans-serif",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
                            },
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        Get Started
                    </Button>
                    <LoginText>
                        Already registered?
                        <Button
                            onClick={handleLoginModal}
                            sx={{
                                color: "#2bc3ff",
                                fontSize: "1rem",
                                fontWeight: 600,
                                textTransform: "none",
                                fontFamily: "'Kanit', sans-serif",
                                "&:hover": {
                                    backgroundColor: "rgba(43, 195, 255, 0.1)",
                                },
                            }}
                        >
                            Login
                        </Button>
                    </LoginText>
                </BottomSection>
            </ContentWrapper>

            <SimpleDialog
                isOpen={isOpen}
                handleClose={handleClose}
                content={content}
            />
        </HeroSection>
    );
};

export default Registration;
